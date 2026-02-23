import type { User, Session } from 'better-auth'

// Extend better-auth User with custom fields
interface ExtendedUser extends User {
	username?: string
	stravaAthleteId?: number
}

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: ExtendedUser
			session?: Session
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
