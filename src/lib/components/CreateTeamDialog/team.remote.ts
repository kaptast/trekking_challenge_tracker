import { form } from '$app/server'
import { db } from '$lib/server/db'
import { team } from '$lib/server/db/schema'
import { redirect } from '@sveltejs/kit'
import { z } from 'zod'

export const createTeam = form(
	z.object({
		name: z.string().min(1, 'Team name is required')
	}),
	async ({ name }) => {
		await db.insert(team).values({ name }).execute()

		redirect(303, '/teams')
	}
)
