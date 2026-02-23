import { auth } from '$lib/server/auth'
import { fail, redirect, type Actions } from '@sveltejs/kit'

export const load = async () => {
	redirect(302, '/')
}

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		})
		return redirect(302, '/')
	},
	signInSocial: async (event) => {
		const formData = await event.request.formData()
		const provider = formData.get('provider')?.toString() ?? 'strava'
		const callbackURL = formData.get('callbackURL')?.toString() ?? '/'

		const result = await auth.api.signInWithOAuth2({
			body: {
				providerId: provider,
				callbackURL
			}
		})

		if (result.url) {
			return redirect(302, result.url)
		}

		return fail(400, { message: 'Social sign-in failed' })
	}
}
