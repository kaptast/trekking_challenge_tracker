import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { env } from '$env/dynamic/private'

export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get('hub.mode')
	const challenge = url.searchParams.get('hub.challenge')
	const verifyToken = url.searchParams.get('hub.verify_token')

	if (mode === 'subscribe' && challenge && verifyToken === env.STRAVA_WEBHOOK_VERIFY_TOKEN) {
		return json({ 'hub.challenge': challenge })
	}

	error(403, 'Forbidden')
}

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown
	try {
		body = await request.json()
	} catch {
		return new Response(null, { status: 200 })
	}
	console.log('Strava webhook event received:', JSON.stringify(body))
	return new Response(null, { status: 200 })
}
