import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { activity } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals }) => {
	return {
		activities: loadActivities(locals)
	}
}

type Activity = Pick<
	typeof activity.$inferSelect,
	'name' | 'distance' | 'movingTime' | 'type' | 'polyline'
>

async function loadActivities(locals: App.Locals): Promise<Array<Activity>> {
	if (!locals.user) {
		error(401, 'Unauthorized')
	}

	return db
		.select({
			name: activity.name,
			distance: activity.distance,
			movingTime: activity.movingTime,
			type: activity.type,
			polyline: activity.polyline
		})
		.from(activity)
		.where(eq(activity.userId, locals.user.id))
		.execute()
}
