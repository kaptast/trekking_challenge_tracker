import { calculateMemberDistance, calculateMemberPoints } from '$lib/server/calculatePoints'
import { db } from '$lib/server/db'
import { getActiveOrNextChallenge, type ChallengeInfo } from '$lib/server/db/challenge'
import { activity } from '$lib/server/db/schema'
import { and, eq, gte, lte, sql } from 'drizzle-orm'

export const load = async ({ depends }) => {
	depends('teams')

	const challengeInfo = await getActiveOrNextChallenge()

	return {
		teams: loadTeams(challengeInfo)
	}
}

async function loadTeams(challengeInfo: ChallengeInfo | null) {
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
					},
					user: true
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
			id: team.id,
			name: team.name,
			members: team.members,
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

	return teamsWithPoints
}
