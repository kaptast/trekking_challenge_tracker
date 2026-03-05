import { activity, team, teamMember } from '$lib/server/db/schema'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { eq, sql } from 'drizzle-orm'

export const load: PageServerLoad = async () => {
	return {
		teams: loadLeaderboard(),
		stats: summarizeActivities()
	}
}

type Activity = Pick<typeof activity.$inferSelect, 'name' | 'distance' | 'startDate' | 'type'>

async function loadActivities(locals: App.Locals): Promise<Array<Activity>> {
	if (!locals.user) {
		return []
	}

	return db
		.select({
			name: activity.name,
			distance: activity.distance,
			startDate: activity.startDate,
			type: activity.type
		})
		.from(activity)
		.where(eq(activity.userId, locals.user.id))
		.orderBy(activity.startDate)
		.limit(5)
		.execute()
}

async function loadTeam(locals: App.Locals) {
	if (!locals.user) {
		return null
	}

	const result = await db
		.select({ id: team.id, name: team.name })
		.from(team)
		.innerJoin(teamMember, eq(teamMember.teamId, team.id))
		.where(eq(teamMember.id, locals.user.id))
		.limit(1)
		.execute()

	return result[0] ?? null
}

async function loadLeaderboard() {
	return db.select({ id: team.id, name: team.name }).from(team).orderBy(team.name).execute()
}

async function summarizeActivities() {
	const activities = await db
		.select({
			distance: sql<number>`cast(sum(${activity.distance}) as float)`,
			activityCount: sql<number>`count(*)`
		})
		.from(activity)
		.execute()

	return activities[0]
}
