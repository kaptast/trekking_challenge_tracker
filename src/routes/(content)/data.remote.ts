import { command, getRequestEvent } from '$app/server'
import { db } from '$lib/server/db'
import { teamMember } from '$lib/server/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { error } from '@sveltejs/kit'

export const joinTeam = command(
	z.object({
		id: z.string()
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent()
		if (!locals.user) {
			error(401, 'User not authenticated')
		}

		await db.insert(teamMember).values({ teamId: id, id: locals.user.id }).execute()
		return { success: true, message: 'Joined team successfully' }
	}
)

export const leaveTeam = command(
	z.object({
		id: z.string()
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent()
		if (!locals.user) {
			error(401, 'User not authenticated')
		}

		await db
			.delete(teamMember)
			.where(and(eq(teamMember.teamId, id), eq(teamMember.id, locals.user.id)))
			.execute()
		return { success: true, message: 'Left team successfully' }
	}
)
