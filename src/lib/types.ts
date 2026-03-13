import type { activity } from './server/db/schema'

export type Activity = Pick<
	typeof activity.$inferSelect,
	'name' | 'distance' | 'startDate' | 'sportType' | 'polyline'
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

export type SportType =
	| 'AlpineSki'
	| 'BackcountrySki'
	| 'Badminton'
	| 'Canoeing'
	| 'Crossfit'
	| 'EBikeRide'
	| 'Elliptical'
	| 'EMountainBikeRide'
	| 'Golf'
	| 'GravelRide'
	| 'Handcycle'
	| 'HighIntensityIntervalTraining'
	| 'Hike'
	| 'IceSkate'
	| 'InlineSkate'
	| 'Kayaking'
	| 'Kitesurf'
	| 'MountainBikeRide'
	| 'NordicSki'
	| 'Pickleball'
	| 'Pilates'
	| 'Racquetball'
	| 'Ride'
	| 'RockClimbing'
	| 'RollerSki'
	| 'Rowing'
	| 'Run'
	| 'Sail'
	| 'Skateboard'
	| 'Snowboard'
	| 'Snowshoe'
	| 'Soccer'
	| 'Squash'
	| 'StairStepper'
	| 'StandUpPaddling'
	| 'Surfing'
	| 'Swim'
	| 'TableTennis'
	| 'Tennis'
	| 'TrailRun'
	| 'Velomobile'
	| 'VirtualRide'
	| 'VirtualRow'
	| 'VirtualRun'
	| 'Walk'
	| 'WeightTraining'
	| 'Wheelchair'
	| 'Windsurf'
	| 'Workout'
	| 'Yoga'
