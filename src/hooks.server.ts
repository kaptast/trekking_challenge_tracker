import { sequence } from '@sveltejs/kit/hooks'
import { building } from '$app/environment'
import { auth } from '$lib/server/auth'
import { svelteKitHandler } from 'better-auth/svelte-kit'
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit'
import { paraglideMiddleware } from '$lib/paraglide/server'

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		})
	})

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers })

	if (session) {
		event.locals.session = session.session
		event.locals.user = session.user
	}

	return svelteKitHandler({ event, resolve, auth, building })
}

export const handle: Handle = sequence(handleParaglide, handleBetterAuth)

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	if (request.url.startsWith('https://www.strava.com/api/v3')) {
		try {
			const info = await auth.api.getAccessToken({
				headers: request.headers,
				body: {
					providerId: 'strava'
				}
			})

			if (info.accessToken) {
				request = new Request(request, {
					headers: new Headers({
						Authorization: `Bearer ${info.accessToken}`
					})
				})
			}
		} catch (error) {
			console.error('Error retrieving access token for Strava API request', error)
			redirect(302, '/auth')
		}
	}

	return fetch(request)
}
