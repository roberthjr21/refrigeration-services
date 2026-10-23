import { Pool } from "pg"
import pkg from "@next/env"
const { loadEnvConfig } = pkg

loadEnvConfig(process.cwd())

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("Falta DATABASE_URL. Configúrala en .env.local antes de ejecutar npm run db:setup.")
  process.exit(1)
}

const pool = new Pool({ connectionString: databaseUrl, max: 1, connectionTimeoutMillis: 10_000 })

try {
  await pool.query("SELECT 1")
  const { readFile } = await import("node:fs/promises")
  const { resolve } = await import("node:path")
  const schema = await readFile(resolve(process.cwd(), "db/schema.sql"), "utf8")
  await pool.query(schema)
  console.log("Base de datos lista: esquema aplicado y datos iniciales cargados.")
} catch (error) {
  console.error("No se pudo configurar la base de datos.", error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  await pool.end()
}

