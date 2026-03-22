import { and, gte, lte, gt } from 'drizzle-orm'
import { db } from './index'
import { challenge } from './schema'

export type Challenge = typeof challenge.$inferSelect

export type ChallengeInfo =
	| { challenge: Challenge; isActive: true; progressPercent: number; daysLeft: number }
	| { challenge: Challenge; isActive: false; progressPercent: 0; daysLeft: 0 }

export async function getActiveOrNextChallenge(): Promise<ChallengeInfo | null> {
	const today = new Date().toISOString().split('T')[0]

	const active = await db
		.select()
		.from(challenge)
		.where(and(lte(challenge.startDate, today), gte(challenge.endDate, today)))
		.limit(1)
		.execute()

	console.log("Today's date:", today)
	console.info('Queried active challenges:', active)
	console.log('SQL WHERE clause:', `startDate <= ${today} AND endDate >= ${today}`)

	if (active.length > 0) {
		const c = active[0]
		const start = new Date(c.startDate).getTime()
		const end = new Date(c.endDate).getTime()
		const now = new Date(today).getTime()
		const total = end - start
		const elapsed = now - start
		const progressPercent =
			total > 0 ? Math.min(100, Math.max(0, Math.round((elapsed / total) * 100))) : 0
		const msLeft = end - now
		const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)))
		return { challenge: c, isActive: true, progressPercent, daysLeft }
	}

	const next = await db
		.select()
		.from(challenge)
		.where(gt(challenge.startDate, today))
		.orderBy(challenge.startDate)
		.limit(1)
		.execute()

	if (next.length > 0) {
		return { challenge: next[0], isActive: false, progressPercent: 0, daysLeft: 0 }
	}

	return null
}
