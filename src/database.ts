import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const {
  AZURE_POSTGRES_HOST,
  AZURE_POSTGRES_DB,
  POSTGRES_TEST_DB,
  AZURE_POSTGRESQL_USER,
  POSTGRES_TEST_USER,
  AZURE_POSTGRESQL_PASSWORD,
  ENV,
} = process.env

let Client
console.log(ENV)

if (ENV === "test") {
  Client = new Pool({
    host: AZURE_POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_TEST_USER,
    password: AZURE_POSTGRESQL_PASSWORD as string,
  })
}

if (ENV === "dev") {
  Client = new Pool({
    host: AZURE_POSTGRES_HOST,
    database: AZURE_POSTGRES_DB,
    user: AZURE_POSTGRESQL_USER,
    password: AZURE_POSTGRESQL_PASSWORD as string,
  })
}

export default Client
