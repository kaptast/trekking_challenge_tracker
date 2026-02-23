import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import * as schema from './schema'
import { env } from '$env/dynamic/private'

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set')

// Extract file path from DATABASE_URL (remove 'file:' prefix if present)
const dbPath = env.DATABASE_URL.replace(/^file:/, '')

const client = new Database(dbPath, { create: true })

export const db = drizzle(client, { schema })
