import dotenv from "dotenv"
import pg, { Pool } from "pg"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const { SUPABASE_URL, PUBLIC_ANON_KEY } = process.env

if (!SUPABASE_URL || !PUBLIC_ANON_KEY) {
  throw new Error("Supabase credentials are missing. Check your .env file.")
}

export const supabase = createClient(SUPABASE_URL, PUBLIC_ANON_KEY)
