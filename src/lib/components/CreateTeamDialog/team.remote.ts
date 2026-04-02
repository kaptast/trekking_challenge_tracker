import { form, getRequestEvent } from '$app/server'
import { localizeUrl } from '$lib/paraglide/runtime'
import { db } from '$lib/server/db'
import { team } from '$lib/server/db/schema'
import { redirect } from '@sveltejs/kit'
import { z } from 'zod'

export const createTeam = form(
	z.object({
		name: z.string().min(1, 'Team name is required')
	}),
	async ({ name }) => {
		const { locals, url } = getRequestEvent()
		if (!locals.user) {
			redirect(303, localizeUrl(new URL('/auth', url.origin)).href)
		}

		await db.insert(team).values({ name }).execute()

		redirect(303, localizeUrl(new URL('/teams', url.origin)).href)
	}
)
