import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { db } from '$lib/server/db'
import { activity } from '$lib/server/db/schema'
import { XMLParser } from 'fast-xml-parser'
import polyline from '@mapbox/polyline'

interface TrkPt {
	'@_lat': number
	'@_lon': number
	time?: string
}

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371000
	const toRad = (d: number) => (d * Math.PI) / 180
	const dLat = toRad(lat2 - lat1)
	const dLon = toRad(lon2 - lon1)
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized')
	}

	const formData = await request.formData()
	const file = formData.get('file')

	if (!(file instanceof File)) {
		error(400, 'No file provided')
	}

	if (!file.name.toLowerCase().endsWith('.gpx')) {
		error(400, 'Only .gpx files are allowed')
	}

	const text = await file.text()

	const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
	let parsed: Record<string, unknown>
	try {
		parsed = parser.parse(text)
	} catch {
		error(400, 'Invalid GPX file')
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const gpx = parsed?.gpx as any
	if (!gpx) {
		error(400, 'Invalid GPX file: missing <gpx> root element')
	}

	const trk = Array.isArray(gpx.trk) ? gpx.trk[0] : gpx.trk
	if (!trk) {
		error(400, 'Invalid GPX file: no <trk> element found')
	}

	const name: string = trk.name ?? file.name.replace(/\.gpx$/i, '')
	const activityType: string = trk.type ?? 'Hike'

	const trkseg = Array.isArray(trk.trkseg) ? trk.trkseg[0] : trk.trkseg
	const rawPts = trkseg?.trkpt
	if (!rawPts) {
		error(400, 'Invalid GPX file: no track points found')
	}

	const trkpts: TrkPt[] = Array.isArray(rawPts) ? rawPts : [rawPts]

	if (trkpts.length < 2) {
		error(400, 'GPX file must contain at least 2 track points')
	}

	// Calculate distance and collect coordinates for polyline
	let distanceMeters = 0
	const coords: [number, number][] = []
	for (const pt of trkpts) {
		const lat = Number(pt['@_lat'])
		const lon = Number(pt['@_lon'])
		if (coords.length > 0) {
			const prev = coords[coords.length - 1]
			distanceMeters += haversineMeters(prev[0], prev[1], lat, lon)
		}
		coords.push([lat, lon])
	}

	// Moving time: last timestamp minus first timestamp
	const firstTime = trkpts[0].time ? new Date(trkpts[0].time).getTime() : null
	const lastTime = trkpts[trkpts.length - 1].time
		? new Date(trkpts[trkpts.length - 1].time!).getTime()
		: null
	const movingTimeSecs =
		firstTime !== null && lastTime !== null ? Math.round((lastTime - firstTime) / 1000) : null

	const startDate = trkpts[0].time ?? null
	const encodedPolyline = polyline.encode(coords)

	const id = crypto.randomUUID()

	await db
		.insert(activity)
		.values({
			id,
			userId: locals.user.id,
			name,
			distance: distanceMeters,
			movingTime: movingTimeSecs ?? undefined,
			isDraft: true,
			type: activityType,
			sportType: activityType,
			startDate,
			startDateLocal: startDate,
			polyline: encodedPolyline
		})
		.execute()

	return json({
		id,
		name,
		distance: distanceMeters,
		movingTime: movingTimeSecs,
		type: activityType,
		polyline: encodedPolyline,
		startDate
	})
}
