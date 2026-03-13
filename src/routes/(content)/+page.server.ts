import { activity } from '$lib/server/db/schema'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { eq, sql } from 'drizzle-orm'
import { calculateMemberDistance, calculateMemberPoints } from '$lib/server/calculatePoints'

export const load: PageServerLoad = async () => {
	return {
		teams: loadLeaderboard(),
		stats: summarizeActivities()
	}
}

async function loadLeaderboard() {
	const teams = await db.query.team.findMany({
		with: {
			members: {
				with: {
					activities: {
						where: eq(activity.isDraft, false)
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

async function summarizeActivities() {
	const activities = await db
		.select({
			distance: sql<number>`cast(sum(${activity.distance}) as float)`,
			activityCount: sql<number>`count(*)`,
			averageDistance: sql<number>`cast(avg(${activity.distance}) as float)`,
			averageActivityCountPerUser: sql<number>`cast(count(*) / nullif(count(distinct ${activity.userId}), 0) as float)`
		})
		.from(activity)
		.where(eq(activity.isDraft, false))
		.execute()

	return activities[0]
}
