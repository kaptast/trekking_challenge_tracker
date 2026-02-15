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

async function loadActivities(locals: App.Locals): Promise<Array<typeof activity.$inferSelect>> {
	if (!locals.user) {
		error(401, 'Unauthorized')
	}

	return db.select().from(activity).where(eq(activity.athleteId, locals.user.id)).execute()
}
