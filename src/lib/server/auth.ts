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
			allowDifferentEmails: true,
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
					mapProfileToUser: (profile) => {
						return {
							email: profile.email || `${profile.id}@strava.local`, // Provide a fallback email
							name:
								profile.firstname && profile.lastname
									? `${profile.firstname} ${profile.lastname}`
									: profile.username,
							emailVerified: profile.emailVerified || false,
							image: profile.profile || profile.profile_medium,
							username: profile.username
						}
					}
				}
			]
		}),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
})
