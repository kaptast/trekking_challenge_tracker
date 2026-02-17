import { command, getRequestEvent } from '$app/server'
import { db } from '$lib/server/db'
import { team, teamMember } from '$lib/server/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export const createTeam = command(
	z.object({
		name: z.string().min(1, 'Team name is required')
	}),
	async ({ name }) => {
		await db.insert(team).values({ name }).execute()

		return { success: true, message: 'Team created successfully' }
	}
)

export const joinTeam = command(
	z.object({
		id: z.string()
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent()
		if (!locals.user || !locals.user.stravaAthleteId) {
			return { success: false, message: 'User not authenticated' }
		}

		await db.insert(teamMember).values({ teamId: id, id: locals.user.stravaAthleteId }).execute()
		return { success: true, message: 'Joined team successfully' }
	}
)

export const leaveTeam = command(
	z.object({
		id: z.string()
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent()
		if (!locals.user || !locals.user.stravaAthleteId) {
			return { success: false, message: 'User not authenticated' }
		}

		await db
			.delete(teamMember)
			.where(and(eq(teamMember.teamId, id), eq(teamMember.id, locals.user.stravaAthleteId)))
			.execute()
		return { success: true, message: 'Left team successfully' }
	}
)
