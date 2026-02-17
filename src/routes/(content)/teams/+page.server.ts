import { db } from '$lib/server/db'

export const load = async () => {
	return {
		teams: loadTeams()
	}
}

async function loadTeams() {
	return db.query.team.findMany({
		with: {
			members: {
				with: {
					activities: true
				}
			}
		}
	})
}
