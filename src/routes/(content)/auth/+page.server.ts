import { localizeUrl } from '$lib/paraglide/runtime'
import { auth } from '$lib/server/auth'
import { getPointsForActivity } from '$lib/server/calculatePoints'
import { db } from '$lib/server/db'
import { activity, team, teamMember, user } from '$lib/server/db/schema'
import type { Activity, Stats } from '$lib/types'
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit'
import { APIError, type User } from 'better-auth'
import { desc, eq, sql, and } from 'drizzle-orm'

export const load: ServerLoad = async ({ request, locals }) => {
	if (!locals.user) {
		return {
			accounts: [],
			latestActivity: null,
			activities: [],
			team: null,
			stats: null
		}
	}

	return {
		avatarSeed: locals.user.avatarSeed ?? null,
		accounts: auth.api.listUserAccounts({
			headers: request.headers
		}),
		team: loadTeam(locals.user),
		activities: loadActivities(locals.user),
		latestActivity: loadActivities(locals.user, 1),
		stats: summarizeActivities(locals.user)
	}
}

async function loadTeam(user: User) {
	const result = await db
		.select({ id: team.id, name: team.name })
		.from(team)
		.innerJoin(teamMember, eq(teamMember.teamId, team.id))
		.where(eq(teamMember.id, user.id))
		.limit(1)
		.execute()

	return result[0] ?? null
}

async function loadActivities(user: User, limit: number = 5): Promise<Array<Activity>> {
	const activities = await db
		.select({
			id: activity.id,
			name: activity.name,
			distance: activity.distance,
			startDate: activity.startDate,
			sportType: activity.sportType,
			polyline: activity.polyline,
			source: activity.source,
			deviceName: activity.deviceName,
			athleteCount: activity.athleteCount
		})
		.from(activity)
		.where(and(eq(activity.userId, user.id), eq(activity.isDraft, false)))
		.orderBy(desc(activity.startDate))
		.limit(limit)
		.execute()

	return activities.map((a) => ({
		...a,
		points: getPointsForActivity(a)
	}))
}

async function summarizeActivities(user: User): Promise<Stats> {
	const [statsResult, streakResult] = await Promise.all([
		db
			.select({
				activityCount: sql<number>`count(*)`,
				totalDistance: sql<number>`cast(sum(${activity.distance}) as float)`,
				averageDistance: sql<number>`cast(avg(${activity.distance}) as float)`,
				longestDistance: sql<number>`cast(max(${activity.distance}) as float)`,
				totalTime: sql<number>`cast(sum(${activity.movingTime}) as float)`,
				averageTime: sql<number>`cast(avg(${activity.movingTime}) as float)`,
				longestTime: sql<number>`cast(max(${activity.movingTime}) as float)`
			})
			.from(activity)
			.where(and(eq(activity.userId, user.id), eq(activity.isDraft, false)))
			.execute(),
		db.execute(sql`
			SELECT COALESCE(MAX(cnt), 0)::int AS longest_streak
			FROM (
				SELECT COUNT(*) AS cnt
				FROM (
					SELECT
						day,
						day - (ROW_NUMBER() OVER (ORDER BY day))::int AS grp
					FROM (
						SELECT DISTINCT CAST(${activity.startDate} AS date) AS day
						FROM ${activity}
						WHERE ${activity.userId} = ${user.id}
					) distinct_days
				) grouped
				GROUP BY grp
			) streaks
		`)
	])

	return {
		...statsResult[0],
		longestStreak: Number(streakResult[0]?.longest_streak ?? 0)
	}
}

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		})
		return redirect(302, localizeUrl('/'))
	},

	signIn: async (event) => {
		const formData = await event.request.formData()
		const email = formData.get('email')?.toString() ?? ''
		const password = formData.get('password')?.toString() ?? ''

		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL: '/auth/verification-success'
				}
			})
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Signin failed' })
			}
			return fail(500, { message: 'Unexpected error' })
		}

		return redirect(302, localizeUrl('/'))
	},

	signUp: async (event) => {
		const formData = await event.request.formData()
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()
		const name = formData.get('name')?.toString()

		if (!email || !password || !name) {
			return fail(400, { message: 'Name, email and password are required' })
		}

		try {
			await auth.api.signUpEmail({
				body: {
					email,
					password,
					name,
					callbackURL: '/auth/verification-success'
				}
			})
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Registration failed' })
			}
			return fail(500, { message: 'Unexpected error' })
		}

		return redirect(302, localizeUrl('/'))
	},

	linkStrava: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'You must be signed in to link Strava' })
		}

		const callbackURL = event.request.headers.get('referer') ?? '/'

		const result = await auth.api.linkSocialAccount({
			body: { provider: 'strava', callbackURL },
			headers: event.request.headers
		})

		if (result.url) {
			redirect(302, localizeUrl(result.url))
		}

		return fail(400, { message: 'Failed to initiate Strava linking' })
	},

	unlinkStrava: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'You must be signed in' })
		}

		await db
			.delete(activity)
			.where(and(eq(activity.userId, event.locals.user.id), eq(activity.source, 'strava')))
			.execute()

		await auth.api.unlinkAccount({
			body: { providerId: 'strava' },
			headers: event.request.headers
		})

		redirect(302, localizeUrl('/'))
	},

	deleteAccount: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'You must be signed in' })
		}

		const userId = event.locals.user.id

		await db.delete(activity).where(eq(activity.userId, userId)).execute()

		await auth.api.signOut({ headers: event.request.headers })

		await db.delete(user).where(eq(user.id, userId)).execute()

		redirect(302, localizeUrl('/'))
	}
}
