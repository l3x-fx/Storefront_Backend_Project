import dotenv from "dotenv"
import pg, { Pool } from "pg"

dotenv.config()

const { AZURE_POSTGRES_HOST, AZURE_POSTGRES_DB, AZURE_POSTGRESQL_USER, AZURE_POSTGRESQL_PASSWORD } = process.env

let Client

Client = new Pool({
  host: AZURE_POSTGRES_HOST,
  database: AZURE_POSTGRES_DB,
  user: AZURE_POSTGRESQL_USER,
  password: AZURE_POSTGRESQL_PASSWORD as string,
  port: 5432,
  ssl: true,
})

export default Client
