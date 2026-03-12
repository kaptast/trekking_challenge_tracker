import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { activity } from '$lib/server/db/schema'
import { eq, desc } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/auth')
	}

	return {
		activities: loadActivities(locals)
	}
}

type Activity = Pick<
	typeof activity.$inferSelect,
	'id' | 'name' | 'distance' | 'movingTime' | 'type' | 'polyline'
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
			polyline: activity.polyline
		})
		.from(activity)
		.where(eq(activity.userId, locals.user.id))
		.orderBy(desc(activity.startDate))
		.execute()
}
