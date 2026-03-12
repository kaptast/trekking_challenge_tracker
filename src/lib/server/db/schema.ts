import { relations } from 'drizzle-orm'
import { pgTable, text, integer, decimal, bigint } from 'drizzle-orm/pg-core'
import { user } from './auth.schema'

export const team = pgTable('team', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull()
})

export const teamMember = pgTable('team_member', {
	id: text('id')
		.primaryKey()
		.references(() => user.id, { onDelete: 'cascade' }),
	teamId: text('team_id')
		.notNull()
		.references(() => team.id, { onDelete: 'cascade' })
})

export const activity = pgTable('activity', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').notNull(),
	name: text('name').notNull(),
	distance: decimal('distance', { mode: 'number' }).notNull(),
	movingTime: decimal('moving_time', { mode: 'number' }),
	type: text('type'),
	sportType: text('sport_type'),
	workoutType: integer('workout_type'),
	deviceName: text('device_name'),
	startDate: text('start_date'),
	startDateLocal: text('start_date_local'),
	timezone: text('timezone'),
	utcOffset: integer('utc_offset'),
	locationCity: text('location_city'),
	locationState: text('location_state'),
	locationCountry: text('location_country'),
	polyline: text('polyline'),
	maxSpeed: decimal('max_speed', { mode: 'number' })
})

export const teamRelations = relations(team, ({ many }) => ({
	members: many(teamMember)
}))

export const teamMemberRelations = relations(teamMember, ({ one, many }) => ({
	team: one(team, {
		fields: [teamMember.teamId],
		references: [team.id]
	}),
	user: one(user, {
		fields: [teamMember.id],
		references: [user.id]
	}),
	activities: many(activity)
}))

export const activityRelations = relations(activity, ({ one }) => ({
	athlete: one(teamMember, {
		fields: [activity.userId],
		references: [teamMember.id]
	})
}))

export * from './auth.schema'
