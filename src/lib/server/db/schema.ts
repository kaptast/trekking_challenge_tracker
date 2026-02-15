import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const team = sqliteTable('team', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull()
})

export const teamMember = sqliteTable('team_member', {
	id: text('id').primaryKey(),
	teamId: text('team_id')
		.notNull()
		.references(() => team.id, { onDelete: 'cascade' })
})

export const activity = sqliteTable('activity', {
	id: integer('id').primaryKey(),
	athleteId: text('athlete_id').notNull(),
	name: text('name').notNull(),
	distance: integer('distance').notNull(),
	movingTime: integer('moving_time').notNull(),
	type: text('type').notNull(),
	sportType: text('sport_type').notNull(),
	workoutType: integer('workout_type').notNull(),
	deviceName: text('device_name').notNull(),
	startDate: text('start_date').notNull(),
	startDateLocal: text('start_date_local').notNull(),
	timezone: text('timezone').notNull(),
	utcOffset: integer('utc_offset').notNull(),
	locationCity: text('location_city'),
	locationState: text('location_state'),
	locationCountry: text('location_country'),
	polyline: text('polyline').notNull(),
	maxSpeed: integer('max_speed').notNull()
})

export const task = sqliteTable('task', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
})
