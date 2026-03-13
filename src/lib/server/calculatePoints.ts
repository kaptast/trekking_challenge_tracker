import type { Activity } from '$lib/types'

// TODO: Rewamp this to use a more sophisticated points system based on activity type, distance, and other factors
export function getPointsForActivity(activity: Activity) {
	const distanceInKm = activity.distance / 1000

	switch (activity.type) {
		case 'Hike':
		case 'Walk':
			return Math.floor(distanceInKm) // 1 point per km
		case 'Run':
			return Math.floor(distanceInKm * 0.5) // 0.5 points per km
		default:
			return Math.floor(distanceInKm * 0.25) // 0.25 points per km for other types
	}
}

export function calculateMemberPoints(activities: Activity[]) {
	return activities.reduce((total, activity) => total + getPointsForActivity(activity), 0)
}

export function calculateMemberDistance(activities: Activity[]) {
	return activities.reduce((total, activity) => total + activity.distance, 0)
}
