import { db } from '$lib/server/db'
import { team } from '$lib/server/db/schema.js'

export const load = async () => {
	return {
		teams: loadTeams()
	}
}

async function loadTeams() {
	return db.select().from(team).execute()
}
