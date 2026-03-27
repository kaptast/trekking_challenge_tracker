import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { env } from '$env/dynamic/private'
import { db } from '$lib/server/db'
import { activity, account } from '$lib/server/db/schema'
import { and, eq } from 'drizzle-orm'

type EmptyUpdates = Record<string, never>

type StravaActivityUpdatePayload = Partial<{
	title: string
	type: string
	private: 'true' | 'false'
}>

type StravaWebhookEventBase = {
	object_id: number
	event_time: number
	subscription_id: number
	owner_id: number
}

type StravaActivityWebhookEvent =
	| (StravaWebhookEventBase & {
			object_type: 'activity'
			aspect_type: 'create' | 'delete'
			updates: EmptyUpdates
	  })
	| (StravaWebhookEventBase & {
			object_type: 'activity'
			aspect_type: 'update'
			updates: StravaActivityUpdatePayload
	  })

type StravaAthleteWebhookEvent =
	| (StravaWebhookEventBase & {
			object_type: 'athlete'
			aspect_type: 'delete'
			updates: EmptyUpdates
	  })
	| (StravaWebhookEventBase & {
			object_type: 'athlete'
			aspect_type: 'update'
			updates: {
				authorized: 'false'
			}
	  })

export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get('hub.mode')
	const challenge = url.searchParams.get('hub.challenge')
	const verifyToken = url.searchParams.get('hub.verify_token')

	if (mode === 'subscribe' && challenge && verifyToken === env.STRAVA_WEBHOOK_VERIFY_TOKEN) {
		return json({ 'hub.challenge': challenge })
	}

	error(403, 'Forbidden')
}

type StravaWebhookEvent = StravaActivityWebhookEvent | StravaAthleteWebhookEvent

export const POST: RequestHandler = async ({ request }) => {
	let body: StravaWebhookEvent
	try {
		body = await request.json()
	} catch {
		error(400, 'Invalid JSON body')
	}

	console.log('Received Strava webhook event:', body)

	switch (body.object_type) {
		case 'activity':
			handleActivityEvent(body)
			break
		case 'athlete':
			await handleAthleteEvent(body)
			break
		default:
			error(400, 'Unknown object type')
	}

	return new Response(null, { status: 200 })
}

// TODO: Decide whether activities should be synced automatically or not and implement these handlers if so.
// If not, we can just ignore these events and let the user trigger syncs manually from the UI when they want to update their activities.
function handleActivityEvent(event: StravaActivityWebhookEvent) {
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
async function handleAthleteEvent(event: StravaAthleteWebhookEvent) {
	console.info(
		`Received Strava athlete event: ${event.aspect_type} for athlete ID ${event.object_id}`
	)

	switch (event.aspect_type) {
		case 'delete':
			await unlinkStravaAccount(event.owner_id)
			break
		case 'update':
			if (event.updates.authorized === 'false') {
				await unlinkStravaAccount(event.owner_id)
			}
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
			.execute()
	} catch (err) {
		console.error(
			`Failed to delete Strava activities for user ${stravaAccount.userId}: ${err}. Aborting account unlink.`
		)
		return
	}

	await db
		.delete(account)
		.where(and(eq(account.providerId, 'strava'), eq(account.accountId, stravaAccountId)))
		.execute()
}
