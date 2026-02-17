import { command } from '$app/server'
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
