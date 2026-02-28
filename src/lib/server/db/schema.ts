import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const team = sqliteTable('team', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull()
})

export const teamMember = sqliteTable('team_member', {
	id: integer('id').primaryKey(),
	teamId: text('team_id')
		.notNull()
		.references(() => team.id, { onDelete: 'cascade' })
})

export const activity = sqliteTable('activity', {
	id: integer('id').primaryKey(),
	athleteId: integer('athlete_id').notNull(),
	name: text('name').notNull(),
	distance: integer('distance').notNull(),
	movingTime: integer('moving_time'),
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
	maxSpeed: integer('max_speed')
})

export const teamRelations = relations(team, ({ many }) => ({
	members: many(teamMember)
}))

export const teamMemberRelations = relations(teamMember, ({ one, many }) => ({
	team: one(team, {
		fields: [teamMember.teamId],
		references: [team.id]
	}),
	activities: many(activity)
}))

export const activityRelations = relations(activity, ({ one }) => ({
	athlete: one(teamMember, {
		fields: [activity.athleteId],
		references: [teamMember.id]
	})
}))

export * from './auth.schema'
