import { auth } from '$lib/server/auth'
import { db } from '$lib/server/db'
import { activity, team, teamMember } from '$lib/server/db/schema'
import type { Activity } from '$lib/types'
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit'
import { APIError, type User } from 'better-auth'
import { eq } from 'drizzle-orm'

export const load: ServerLoad = async ({ request, locals }) => {
	if (!locals.user) {
		return {
			accounts: [],
			latestActivity: null,
			activities: [],
			team: null
		}
	}

	return {
		accounts: auth.api.listUserAccounts({
			headers: request.headers
		}),
		team: loadTeam(locals.user),
		activities: loadActivities(locals.user),
		latestActivity: loadActivities(locals.user, 1)
	}
}

async function loadTeam(user: User) {
	const result = await db
		.select({ id: team.id, name: team.name })
		.from(team)
		.innerJoin(teamMember, eq(teamMember.teamId, team.id))
		.where(eq(teamMember.id, user.id))
		.limit(1)
		.execute()

	return result[0] ?? null
}

async function loadActivities(user: User, limit: number = 5): Promise<Array<Activity>> {
	return db
		.select({
			name: activity.name,
			distance: activity.distance,
			startDate: activity.startDate,
			type: activity.type
		})
		.from(activity)
		.where(eq(activity.userId, user.id))
		.orderBy(activity.startDate)
		.limit(limit)
		.execute()
}

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		})
		return redirect(302, '/')
	},

	signIn: async (event) => {
		const formData = await event.request.formData()
		const email = formData.get('email')?.toString() ?? ''
		const password = formData.get('password')?.toString() ?? ''

		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL: '/auth/verification-success'
				}
			})
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Signin failed' })
			}
			return fail(500, { message: 'Unexpected error' })
		}

		return redirect(302, '/')
	},

	signUp: async (event) => {
		const formData = await event.request.formData()
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()
		const name = formData.get('name')?.toString()

		if (!email || !password || !name) {
			return fail(400, { message: 'Name, email and password are required' })
		}

		try {
			await auth.api.signUpEmail({
				body: {
					email,
					password,
					name,
					callbackURL: '/auth/verification-success'
				}
			})
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Registration failed' })
			}
			return fail(500, { message: 'Unexpected error' })
		}

		return redirect(302, '/')
	},

	linkStrava: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'You must be signed in to link Strava' })
		}

		const callbackURL = event.request.headers.get('referer') ?? '/'

		const result = await auth.api.linkSocialAccount({
			body: { provider: 'strava', callbackURL },
			headers: event.request.headers
		})

		if (result.url) {
			redirect(302, result.url)
		}

		return fail(400, { message: 'Failed to initiate Strava linking' })
	},

	unlinkStrava: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'You must be signed in' })
		}

		await auth.api.unlinkAccount({
			body: { providerId: 'strava' },
			headers: event.request.headers
		})

		redirect(302, '/')
	}
}
