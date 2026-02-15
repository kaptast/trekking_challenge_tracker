import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db/index.js'
import { activity } from '$lib/server/db/schema.js'
import { inArray } from 'drizzle-orm'

export const load: PageServerLoad = async ({ request, fetch }) => {
	return {
		activities: fetchActivities(request, fetch)
	}
}

export const actions = {
	sync: async ({ request }) => {
		const formData = await request.formData()
		const activityIds = formData.getAll('activityIds') as string[]

		console.log('Selected activity IDs for sync:', activityIds)
	}
}

async function fetchActivities(
	request: Request,
	fetch: typeof globalThis.fetch
): Promise<SyncedActivity[]> {
	const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
		method: 'GET',
		headers: request.headers
	})

	if (!response.ok) {
		error(response.status, `Failed to fetch activities: ${response.statusText}`)
	}

	const activities = (await response.json()) as Activity[]

	const activityIds = activities.map((activity) => activity.id)

	// Use inArray from drizzle-orm for the IN query
	const savedActivities = await db
		.select({ id: activity.id })
		.from(activity)
		.where(inArray(activity.id, activityIds))

	const savedActivityIds = new Set(savedActivities.map((a) => a.id))

	// Mark which activities are already synced
	const activitiesWithSyncStatus: SyncedActivity[] = activities.map((act) => ({
		...act,
		synced: savedActivityIds.has(act.id)
	}))

	return activitiesWithSyncStatus
}

type SyncedActivity = Activity & {
	synced: boolean
}

type Activity = {
	resource_state: number
	athlete: {
		id: number
	}
	name: string
	distance: number
	moving_time: number
	elapsed_time: number
	total_elevation_gain: number
	type: string
	sport_type: string
	workout_type: number
	device_name: string
	id: number
	start_date: string
	start_date_local: string
	timezone: string
	utc_offset: number
	location_city: string | null
	location_state: string | null
	location_country: string | null
	achievement_count: number
	kudos_count: number
	comment_count: number
	athlete_count: number
	photo_count: number
	map: {
		id: string
		summary_polyline: string
		resource_state: number
	}
	trainer: boolean
	commute: boolean
	manual: boolean
	private: boolean
	visibility: string
	flagged: boolean
	gear_id: string
	start_latlng: [number, number]
	end_latlng: [number, number]
	average_speed: number
	max_speed: number
	average_cadence: number
	average_temp: number
	average_watts: number
	device_watts: boolean
	kilojoules: number
	has_heartrate: boolean
	average_heartrate: number
	max_heartrate: number
	heartrate_opt_out: boolean
	display_hide_heartrate_option: boolean
	elev_high: number
	elev_low: number
	upload_id: number
	upload_id_str: string
	external_id: string
	from_accepted_tag: boolean
	pr_count: number
	total_photo_count: number
	has_kudoed: boolean
	suffer_score: number
}
