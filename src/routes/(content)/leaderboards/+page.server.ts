import { getActiveOrNextChallenge } from '$lib/server/db/challenge'
import {
	loadAthletesByTypes,
	loadOtherAthletes,
	WALK_HIKE_TYPES,
	RUN_TYPES
} from '$lib/server/leaderboard'
import type { PageServerLoad } from './$types'

export type { AthleteRank } from '$lib/server/leaderboard'

export const load: PageServerLoad = async () => {
	const challengeInfo = await getActiveOrNextChallenge()

	if (!challengeInfo?.isActive) {
		return { walkHikeAthletes: [], runAthletes: [], otherAthletes: [] }
	}

	const { startDate, endDate } = challengeInfo.challenge

	return {
		walkHikeAthletes: loadAthletesByTypes(startDate, endDate, WALK_HIKE_TYPES),
		runAthletes: loadAthletesByTypes(startDate, endDate, RUN_TYPES),
		otherAthletes: loadOtherAthletes(startDate, endDate)
	}
}
