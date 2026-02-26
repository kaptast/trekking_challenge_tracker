import { auth } from '$lib/server/auth'
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
	return {
		stravaLinked: Boolean(locals.user?.stravaAthleteId)
	}
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
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()

		if (!email || !password) {
			return fail(400, { message: 'Email and password are required' })
		}

		const result = await auth.api.signInEmail({
			body: { email, password },
			headers: event.request.headers,
			asResponse: true
		})

		if (!result.ok) {
			const body = await result.json().catch(() => ({}))
			return fail(result.status, {
				message: (body as { message?: string }).message ?? 'Sign-in failed'
			})
		}

		const setCookie = result.headers.get('set-cookie')
		if (setCookie) {
			event.cookies.set('better-auth-session', setCookie, {})
		}

		redirect(302, '/')
	},

	signUp: async (event) => {
		const formData = await event.request.formData()
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()
		const name = formData.get('name')?.toString()

		if (!email || !password || !name) {
			return fail(400, { message: 'Name, email and password are required' })
		}

		const result = await auth.api.signUpEmail({
			body: { email, password, name },
			headers: event.request.headers,
			asResponse: true
		})

		if (!result.ok) {
			const body = await result.json().catch(() => ({}))
			return fail(result.status, {
				message: (body as { message?: string }).message ?? 'Sign-up failed'
			})
		}

		const setCookie = result.headers.get('set-cookie')
		if (setCookie) {
			event.cookies.set('better-auth-session', setCookie, {})
		}

		redirect(302, '/')
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
