import { Pool } from "pg"

const globalForPostgres = globalThis as typeof globalThis & { quoteDatabasePool?: Pool }

export function getQuoteDatabase(): Pool {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error("DATABASE_URL is not configured")

  if (!globalForPostgres.quoteDatabasePool) {
    globalForPostgres.quoteDatabasePool = new Pool({
      connectionString,
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    })
  }

  return globalForPostgres.quoteDatabasePool
}
