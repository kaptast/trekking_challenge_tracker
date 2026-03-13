import type { Activity, SportType } from '$lib/types'

// TODO: Rewamp this to use a more sophisticated points system based on activity type, distance, and other factors
export function getPointsForActivity(activity: Activity) {
	const distanceInKm = activity.distance / 1000
	const athleteCount = activity.athleteCount || 1 // Default to 1 if athleteCount is not provided

	switch (activity.sportType as SportType) {
		case 'Hike':
		case 'Walk':
			return Math.floor(distanceInKm) * athleteCount // 1 point per km
		case 'Run':
			return Math.floor(distanceInKm * 0.5) * athleteCount // 0.5 points per km
		default:
			return Math.floor(distanceInKm * 0.25) * athleteCount // 0.25 points per km for other types
	}
}

export function calculateMemberPoints(activities: Activity[]) {
	return activities.reduce((total, activity) => total + getPointsForActivity(activity), 0)
}

export function calculateMemberDistance(activities: Activity[]) {
	return activities.reduce((total, activity) => total + activity.distance, 0)
}
