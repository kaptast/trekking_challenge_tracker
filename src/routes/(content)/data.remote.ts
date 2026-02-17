import { command } from '$app/server'
import { z } from 'zod'

export const createTeam = command(
	z.object({
		name: z.string().min(1, 'Team name is required'),
		code: z.string().length(6, 'Team code must be 6 characters long')
	}),
	async ({ name, code }) => {
		console.log('Creating team with name in command:', name, 'and code:', code)
		return { success: true, message: 'Team created successfully' }
	}
)
