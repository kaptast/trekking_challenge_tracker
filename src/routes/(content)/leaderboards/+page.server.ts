import { db } from '$lib/server/db'
import { activity, user } from '$lib/server/db/schema'
import { getActiveOrNextChallenge, type ChallengeInfo } from '$lib/server/db/challenge'
import { and, desc, eq, gte, inArray, lte, notInArray, or, isNull, sql } from 'drizzle-orm'
import type { PageServerLoad } from './$types'

const WALK_HIKE_TYPES = ['Walk', 'Hike']
const RUN_TYPES = ['Run', 'TrailRun', 'VirtualRun']

export type AthleteRank = { name: string; totalDistance: number }

export const load: PageServerLoad = async () => {
	const challengeInfo = await getActiveOrNextChallenge()

	return {
		walkHikeAthletes: loadAthletesByTypes(challengeInfo, WALK_HIKE_TYPES),
		runAthletes: loadAthletesByTypes(challengeInfo, RUN_TYPES),
		otherAthletes: loadOtherAthletes(challengeInfo)
	}
}

async function loadAthletesByTypes(
	challengeInfo: ChallengeInfo | null,
	types: string[]
): Promise<AthleteRank[]> {
	if (!challengeInfo?.isActive) return []

	const { startDate, endDate } = challengeInfo.challenge

	return db
		.select({
			name: user.name,
			totalDistance: sql<number>`cast(sum(${activity.distance}) as float)`
		})
		.from(activity)
		.innerJoin(user, eq(activity.userId, user.id))
		.where(
			and(
				eq(activity.isDraft, false),
				inArray(activity.sportType, types),
				gte(sql`left(${activity.startDate}, 10)`, startDate),
				lte(sql`left(${activity.startDate}, 10)`, endDate)
			)
		)
		.groupBy(user.id, user.name)
		.orderBy(desc(sql`sum(${activity.distance})`))
		.execute()
}

async function loadOtherAthletes(challengeInfo: ChallengeInfo | null): Promise<AthleteRank[]> {
	if (!challengeInfo?.isActive) return []

	const { startDate, endDate } = challengeInfo.challenge
	const excludedTypes = [...WALK_HIKE_TYPES, ...RUN_TYPES]

	return db
		.select({
			name: user.name,
			totalDistance: sql<number>`cast(sum(${activity.distance}) as float)`
		})
		.from(activity)
		.innerJoin(user, eq(activity.userId, user.id))
		.where(
			and(
				eq(activity.isDraft, false),
				or(isNull(activity.sportType), notInArray(activity.sportType, excludedTypes)),
				gte(sql`left(${activity.startDate}, 10)`, startDate),
				lte(sql`left(${activity.startDate}, 10)`, endDate)
			)
		)
		.groupBy(user.id, user.name)
		.orderBy(desc(sql`sum(${activity.distance})`))
		.execute()
}
