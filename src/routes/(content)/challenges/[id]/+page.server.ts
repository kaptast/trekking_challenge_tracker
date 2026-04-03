import { error } from '@sveltejs/kit'
import { getChallengeById } from '$lib/server/db/challenge'
import {
	loadAthletesByTypes,
	loadOtherAthletes,
	WALK_HIKE_TYPES,
	RUN_TYPES
} from '$lib/server/leaderboard'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const challenge = await getChallengeById(params.id)

	if (!challenge) {
		error(404, 'Challenge not found')
	}

	const { startDate, endDate } = challenge

	return {
		challenge,
		walkHikeAthletes: loadAthletesByTypes(startDate, endDate, WALK_HIKE_TYPES),
		runAthletes: loadAthletesByTypes(startDate, endDate, RUN_TYPES),
		otherAthletes: loadOtherAthletes(startDate, endDate)
	}
}
