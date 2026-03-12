import { calculateMemberDistance, calculateMemberPoints } from '$lib/server/calculatePoints'
import { db } from '$lib/server/db'
import { activity } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const load = async ({ depends }) => {
	depends('teams')

	return {
		teams: loadTeams()
	}
}

async function loadTeams() {
	const teams = await db.query.team.findMany({
		with: {
			members: {
				with: {
					activities: {
						where: eq(activity.isDraft, false)
					},
					user: true
				}
			}
		}
	})

	const teamsWithPoints = teams.map((team) => {
		const points = team.members.reduce((sum, member) => {
			return sum + calculateMemberPoints(member.activities)
		}, 0)

		const totalDistance = team.members.reduce((sum, member) => {
			return sum + calculateMemberDistance(member.activities)
		}, 0)

		return {
			id: team.id,
			name: team.name,
			members: team.members,
			totalDistance,
			points
		}
	})

	teamsWithPoints.sort((a, b) => {
		if (b.points === a.points) {
			return b.totalDistance - a.totalDistance
		}
		return b.points - a.points
	})

	return teamsWithPoints
}
