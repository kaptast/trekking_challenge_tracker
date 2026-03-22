import { activity } from '$lib/server/db/schema'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { and, eq, gte, lte, sql } from 'drizzle-orm'
import { calculateMemberDistance, calculateMemberPoints } from '$lib/server/calculatePoints'
import { getActiveOrNextChallenge, type ChallengeInfo } from '$lib/server/db/challenge'

export const load: PageServerLoad = async () => {
	const challengeInfo = await getActiveOrNextChallenge()

	console.info('Loaded challenge info:', challengeInfo)

	return {
		challengeInfo,
		teams: loadLeaderboard(challengeInfo),
		stats: summarizeActivities(challengeInfo)
	}
}

async function loadLeaderboard(challengeInfo: ChallengeInfo | null) {
	if (!challengeInfo?.isActive) {
		return []
	}

	const { startDate, endDate } = challengeInfo.challenge

	const teams = await db.query.team.findMany({
		with: {
			members: {
				with: {
					activities: {
						where: and(
							eq(activity.isDraft, false),
							gte(activity.startDate, startDate),
							lte(sql`left(${activity.startDate}, 10)`, endDate)
						)
					}
				}
			}
		}
	})

	const teamsWithPoints = teams.map((team) => {
		const points = team.members.reduce((sum, member) => {
			return sum + calculateMemberPoints(member.activities)
		}, 0)

		const totalDistance = team.members.reduce((sum, member) => {
			return sum + calculateMemberDistance(member.activities)
		}, 0)

		return {
			name: team.name,
			totalDistance,
			points
		}
	})

	teamsWithPoints.sort((a, b) => {
		if (b.points === a.points) {
			return b.totalDistance - a.totalDistance
		}
		return b.points - a.points
	})

	return teamsWithPoints.slice(0, 5)
}

const zeroStats = {
	distance: 0,
	activityCount: 0,
	averageDistance: 0,
	averageActivityCountPerUser: 0
}

async function summarizeActivities(challengeInfo: ChallengeInfo | null) {
	if (!challengeInfo?.isActive) {
		return zeroStats
	}

	const { startDate, endDate } = challengeInfo.challenge

	const activities = await db
		.select({
			distance: sql<number>`cast(sum(${activity.distance}) as float)`,
			activityCount: sql<number>`count(*)`,
			averageDistance: sql<number>`cast(avg(${activity.distance}) as float)`,
			averageActivityCountPerUser: sql<number>`cast(count(*) / nullif(count(distinct ${activity.userId}), 0) as float)`
		})
		.from(activity)
		.where(
			and(
				eq(activity.isDraft, false),
				gte(activity.startDate, startDate),
				lte(sql`left(${activity.startDate}, 10)`, endDate)
			)
		)
		.execute()

	return activities[0] ?? zeroStats
}
