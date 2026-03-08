import type { activity } from './server/db/schema'

export type Activity = Pick<
	typeof activity.$inferSelect,
	'name' | 'distance' | 'startDate' | 'type'
>
