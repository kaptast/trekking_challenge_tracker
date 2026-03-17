import { error, redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db/index.js'
import { activity } from '$lib/server/db/schema.js'
import { inArray } from 'drizzle-orm'

const PER_PAGE = 30

export const load: PageServerLoad = async ({ request, fetch, locals, url }) => {
	if (!locals.user) {
		redirect(302, '/auth')
	}

	const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10))
	const { activities, hasMore } = await fetchActivities(request, fetch, page)

	return { activities, hasMore, page }
}

export const actions = {
	sync: async ({ request, fetch, locals }) => {
		if (!locals.user) {
			error(401, 'Unauthorized')
		}

		const formData = await request.formData()
		const activitiesToSync = formData.getAll('activityIds') as string[]
		const page = Math.max(1, parseInt((formData.get('page') as string) ?? '1', 10))

		const response = await fetch(
			`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${PER_PAGE}`,
			{
				method: 'GET',
				headers: request.headers
			}
		)

		if (!response.ok) {
			error(response.status, `Failed to fetch activities: ${response.statusText}`)
		}

		const stravaActivities = (await response.json()) as Activity[]
		for (const stravaActivity of stravaActivities) {
			const isIncluded = activitiesToSync.includes(stravaActivity.id.toString())

			if (isIncluded) {
				await db
					.insert(activity)
					.values({
						id: stravaActivity.id.toString(),
						userId: locals.user.id,
						name: stravaActivity.name,
						distance: stravaActivity.distance,
						movingTime: stravaActivity.moving_time,
						type: stravaActivity.type,
						sportType: stravaActivity.sport_type,
						workoutType: stravaActivity.workout_type,
						deviceName: stravaActivity.device_name,
						startDate: stravaActivity.start_date,
						startDateLocal: stravaActivity.start_date_local,
						timezone: stravaActivity.timezone,
						utcOffset: stravaActivity.utc_offset,
						locationCity: stravaActivity.location_city,
						locationState: stravaActivity.location_state,
						locationCountry: stravaActivity.location_country,
						polyline: stravaActivity.map.summary_polyline,
						maxSpeed: stravaActivity.max_speed,
						athleteCount: stravaActivity.athlete_count,
						source: 'strava'
					})
					.execute()
			}
		}
	}
} satisfies Actions

async function fetchActivities(
	request: Request,
	fetch: typeof globalThis.fetch,
	page: number
): Promise<{ activities: SyncedActivity[]; hasMore: boolean }> {
	const response = await fetch(
		`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${PER_PAGE + 1}`,
		{
			method: 'GET',
			headers: request.headers
		}
	)

	if (!response.ok) {
		error(response.status, `Failed to fetch activities: ${response.statusText}`)
	}

	const raw = (await response.json()) as Activity[]
	const hasMore = raw.length > PER_PAGE
	const activities = hasMore ? raw.slice(0, PER_PAGE) : raw

	const activityIds = activities.map((a) => a.id.toString())

	const savedActivities =
		activityIds.length > 0
			? await db
					.select({ id: activity.id })
					.from(activity)
					.where(inArray(activity.id, activityIds))
					.execute()
			: []
	const savedActivityIds = new Set(savedActivities.map((a) => a.id))

	const activitiesWithSyncStatus: SyncedActivity[] = activities.map((act) => ({
		...act,
		synced: savedActivityIds.has(act.id.toString())
	}))

	return { activities: activitiesWithSyncStatus, hasMore }
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
