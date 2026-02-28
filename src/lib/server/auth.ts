import { betterAuth } from 'better-auth'
import { genericOAuth } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { env } from '$env/dynamic/private'
import { getRequestEvent } from '$app/server'
import { db } from './db'

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: {
		enabled: true
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['strava']
		}
	},
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: 'strava',
					clientId: env.STRAVA_CLIENT_ID,
					clientSecret: env.STRAVA_CLIENT_SECRET,
					authorizationUrl: 'https://www.strava.com/oauth/authorize',
					tokenUrl: 'https://www.strava.com/oauth/token',
					userInfoUrl: 'https://www.strava.com/api/v3/athlete',
					scopes: ['activity:read_all'],
					mapProfileToUser: (user) => {
						return {
							email: user.email || `${user.id}@strava.local`, // Provide a fallback email
							name:
								user.firstname && user.lastname
									? `${user.firstname} ${user.lastname}`
									: user.username,
							emailVerified: user.emailVerified || false,
							image: user.profile || user.profile_medium,
							username: user.username,
							stravaAthleteId: user.id // Store Strava athlete ID as custom field
						}
					}
				}
			]
		}),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
})
