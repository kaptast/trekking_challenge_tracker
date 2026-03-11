import { db } from '$lib/server/db'

export const load = async ({ depends }) => {
	depends('teams')

	return {
		teams: loadTeams()
	}
}

async function loadTeams() {
	return db.query.team.findMany({
		with: {
			members: {
				with: {
					activities: true,
					user: true
				}
			}
		}
	})
}
