import { activity, team } from '$lib/server/db/schema'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { sql } from 'drizzle-orm'

export const load: PageServerLoad = async () => {
	return {
		teams: loadLeaderboard(),
		stats: summarizeActivities()
	}
}

async function loadLeaderboard() {
	return db
		.select({ id: team.id, name: team.name })
		.from(team)
		.orderBy(team.name)
		.limit(3)
		.execute()
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
		.execute()

	return activities[0]
}
