import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { activity } from '$lib/server/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getPointsForActivity } from '$lib/server/calculatePoints'
import { localizeUrl } from '$lib/paraglide/runtime'

export const load: PageServerLoad = async ({ locals, depends, url }) => {
	if (!locals.user) {
		redirect(302, localizeUrl(new URL('/auth', url.origin)).href)
	}

	depends('activities')

	return {
		activities: loadActivities(locals)
	}
}

type Activity = Pick<
	typeof activity.$inferSelect,
	| 'id'
	| 'name'
	| 'distance'
	| 'movingTime'
	| 'sportType'
	| 'polyline'
	| 'startDate'
	| 'source'
	| 'deviceName'
>

async function loadActivities(locals: App.Locals): Promise<Array<Activity & { points: number }>> {
	if (!locals.user) {
		error(401, 'Unauthorized')
	}

	const activities = await db
		.select({
			id: activity.id,
			name: activity.name,
			distance: activity.distance,
			movingTime: activity.movingTime,
			sportType: activity.sportType,
			polyline: activity.polyline,
			startDate: activity.startDate,
			athleteCount: activity.athleteCount,
			source: activity.source,
			deviceName: activity.deviceName
		})
		.from(activity)
		.where(and(eq(activity.userId, locals.user.id), eq(activity.isDraft, false)))
		.orderBy(desc(activity.startDate))
		.execute()

	return activities.map((a) => ({
		...a,
		points: getPointsForActivity(a)
	}))
}
