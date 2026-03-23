import { auth } from '$lib/server/auth'
import type { RequestHandler } from './$types'

export const fallback: RequestHandler = async (event) => {
	return auth.handler(event.request)
}
