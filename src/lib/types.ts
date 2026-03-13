import type { activity } from './server/db/schema'

export type Activity = Pick<
	typeof activity.$inferSelect,
	'name' | 'distance' | 'startDate' | 'type' | 'polyline'
> & {
	points?: number
}

export type Stats = {
	activityCount: number
	totalDistance: number
	averageDistance: number
	longestDistance: number
	totalTime: number
	averageTime: number
	longestTime: number
	longestStreak: number
}
