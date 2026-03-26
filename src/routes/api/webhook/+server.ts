import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { env } from '$env/dynamic/private'
import { auth } from '$lib/server/auth'
import { db } from '$lib/server/db'
import { activity, account } from '$lib/server/db/schema'
import { and, eq } from 'drizzle-orm'

export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get('hub.mode')
	const challenge = url.searchParams.get('hub.challenge')
	const verifyToken = url.searchParams.get('hub.verify_token')

	if (mode === 'subscribe' && challenge && verifyToken === env.STRAVA_WEBHOOK_VERIFY_TOKEN) {
		return json({ 'hub.challenge': challenge })
	}

	error(403, 'Forbidden')
}

type StravaWebhookEvent = {
	object_type: 'activity' | 'athlete'
	object_id: number
	aspect_type: 'create' | 'update' | 'delete'
	event_time: number
	subscription_id: number
	owner_id: number
}

export const POST: RequestHandler = async ({ request }) => {
	let body: StravaWebhookEvent
	try {
		body = await request.json()
	} catch {
		error(400, 'Invalid JSON body')
	}

	switch (body.object_type) {
		case 'activity':
			handleActivityEvent(body)
			break
		case 'athlete':
			handleAthleteEvent(body)
			break
		default:
			error(400, 'Unknown object type')
	}

	return new Response(null, { status: 200 })
}

// TODO: Decide whether activities should be synced automatically or not and implement these handlers if so.
// If not, we can just ignore these events and let the user trigger syncs manually from the UI when they want to update their activities.
function handleActivityEvent(event: StravaWebhookEvent) {
	console.info(
		`Received Strava activity event: ${event.aspect_type} for activity ID ${event.object_id}`
	)

	switch (event.aspect_type) {
		case 'create':
			// Handle activity creation logic
			break
		case 'update':
			// Handle activity update logic
			break
		case 'delete':
			// Handle activity deletion logic
			break
	}
}

// Disconnects an athlete's Strava account when they deauthorize the app.
async function handleAthleteEvent(event: StravaWebhookEvent) {
	console.info(
		`Received Strava athlete event: ${event.aspect_type} for athlete ID ${event.object_id}`
	)

	switch (event.aspect_type) {
		case 'delete':
			await unlinkStravaAccount(event.owner_id)
			break
	}
}

async function unlinkStravaAccount(stravaAthleteId: number) {
	const stravaAccountId = stravaAthleteId.toString()

	const [stravaAccount] = await db
		.select({ userId: account.userId })
		.from(account)
		.where(and(eq(account.providerId, 'strava'), eq(account.accountId, stravaAccountId)))
		.limit(1)

	if (!stravaAccount) {
		console.warn(`Strava deauthorization received for unknown account ID ${stravaAccountId}`)
		return
	}

	try {
		await db
			.delete(activity)
			.where(and(eq(activity.userId, stravaAccount.userId), eq(activity.source, 'strava')))
	} catch (err) {
		console.error(
			`Failed to delete Strava activities for user ${stravaAccount.userId}: ${err}. Aborting account unlink.`
		)
		return
	}

	await auth.api.unlinkAccount({
		body: {
			providerId: 'strava',
			accountId: stravaAccountId
		}
	})
}
