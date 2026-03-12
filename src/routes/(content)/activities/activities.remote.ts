import { command, getRequestEvent } from '$app/server'
import { db } from '$lib/server/db'
import { activity } from '$lib/server/db/schema'
import { and, eq, inArray } from 'drizzle-orm'
import { z } from 'zod'
import { error } from '@sveltejs/kit'

export const finalizeActivities = command(
	z.object({
		ids: z.array(z.string()).min(1)
	}),
	async ({ ids }) => {
		const { locals } = getRequestEvent()
		if (!locals.user) {
			error(401, 'Unauthorized')
		}

		await db
			.update(activity)
			.set({ isDraft: false })
			.where(and(inArray(activity.id, ids), eq(activity.userId, locals.user.id)))
			.execute()

		return { success: true }
	}
)

export const removeDraftActivity = command(
	z.object({
		id: z.string()
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent()
		if (!locals.user) {
			error(401, 'Unauthorized')
		}

		await db
			.delete(activity)
			.where(
				and(eq(activity.id, id), eq(activity.userId, locals.user.id), eq(activity.isDraft, true))
			)
			.execute()

		return { success: true }
	}
)
