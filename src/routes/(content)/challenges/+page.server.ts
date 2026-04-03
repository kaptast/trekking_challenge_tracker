import { getAllChallenges } from '$lib/server/db/challenge'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return {
		challenges: getAllChallenges()
	}
}
