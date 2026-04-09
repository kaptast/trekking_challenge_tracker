import { db } from './db'
import { activity, user } from './db/schema'
import { and, desc, eq, gte, inArray, isNull, lte, notInArray, or, sql } from 'drizzle-orm'

export const WALK_HIKE_TYPES = ['Walk', 'Hike']
export const RUN_TYPES = ['Run', 'TrailRun', 'VirtualRun']

export type AthleteRank = { name: string; totalDistance: number }

export async function loadAthletesByTypes(
	startDate: string,
	endDate: string,
	types: string[]
): Promise<AthleteRank[]> {
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

export async function loadOtherAthletes(
	startDate: string,
	endDate: string
): Promise<AthleteRank[]> {
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
