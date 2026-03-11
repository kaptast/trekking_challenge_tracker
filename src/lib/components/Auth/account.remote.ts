import { command, getRequestEvent } from '$app/server'
import { db } from '$lib/server/db'
import { user as userTable } from '$lib/server/db/auth.schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const saveAvatarSeed = command(
	z.object({
		seed: z.string().min(1).max(64)
	}),
	async ({ seed }) => {
		const { locals } = getRequestEvent()
		if (!locals.user) return

		await db.update(userTable).set({ avatarSeed: seed }).where(eq(userTable.id, locals.user.id))
	}
)
