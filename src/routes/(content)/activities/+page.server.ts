import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { activity } from '$lib/server/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals, depends }) => {
	if (!locals.user) {
		redirect(302, '/auth')
	}

	depends('activities')

	return {
		activities: loadActivities(locals)
	}
}

type Activity = Pick<
	typeof activity.$inferSelect,
	'id' | 'name' | 'distance' | 'movingTime' | 'type' | 'polyline' | 'startDate'
>

async function loadActivities(locals: App.Locals): Promise<Array<Activity>> {
	if (!locals.user) {
		error(401, 'Unauthorized')
	}

	return db
		.select({
			id: activity.id,
			name: activity.name,
			distance: activity.distance,
			movingTime: activity.movingTime,
			type: activity.type,
			polyline: activity.polyline,
			startDate: activity.startDate
		})
		.from(activity)
		.where(and(eq(activity.userId, locals.user.id), eq(activity.isDraft, false)))
		.orderBy(desc(activity.startDate))
		.execute()
}
