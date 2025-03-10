// @ts-ignore
import Client from "../database"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { supabase } from "../database"

dotenv.config()
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env
const pepper = BCRYPT_PASSWORD
const saltRounds = SALT_ROUNDS

export type User = {
  password_digest?: string
  id?: Number
  email: string
  firstname: string
  lastname: string
  password: string
  address: string
  zip: number
  city: string
  country: string
}

export type UserLogin = {
  email: string
  password: string
}
export interface UserEdit {
  email: string
  firstname: string
  lastname: string
  address: string
  zip: number
  city: string
  country: string
}

export class UserService {
  async confirmFreeEmail(email: string): Promise<boolean> {
    try {
      console.log(email)
      const { data, error } = await supabase.from("users").select("*").eq("email", email).maybeSingle()

      if (error) {
        throw new Error(`Fancy Database Error!`)
      }

      return !!data
    } catch (error) {
      console.error(`Error in confirmFreeEmail:`, error)
      throw new Error(`Now there Database Error!`)
    }
  }

  async signup(user: User): Promise<User> {
    try {
      console.log("Entering emailExists")
      const emailExists = await this.confirmFreeEmail(user.email)
      console.log("Email", emailExists)
      if (emailExists) {
        throw new Error(`Email ${user.email} is already in use.`)
      }
      //@ts-ignore
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds))
      const { data, error } = await supabase
        .from("users")
        .insert({
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          password_digest: hash,
          address: user.address,
          zip: user.zip,
          city: user.city,
          country: user.country,
        })
        .select("*")
        .single()

      if (error) {
        throw new Error(`Could not add neww user ${user.firstname} ${user.lastname}. ${error}`)
      }
      return data
    } catch (error) {
      console.error(`Error in confirmFreeEmail:`, error)
      throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. ${error}`)
    }
  }

  async login(userLogin: UserLogin): Promise<User> {
    try {
      const { data } = await supabase.from("users").select("*").eq("email", userLogin.email).single()
      const user = data
      if (!user) {
        throw new Error()
      }
      const passwordMatch = await bcrypt.compare(userLogin.password + pepper, user.password_digest)
      if (passwordMatch) {
        return user
      } else {
        throw new Error(`Email or password incorrect.`)
      }
    } catch (error) {
      console.error(`Error in login:`, error)
      throw new Error("An error occurred while logging in. Please try again.")
    }
  }

  async showUserById(id: number): Promise<User> {
    try {
      const { data } = await supabase.from("users").select("*").eq("id", id).single()
      return data
    } catch (error) {
      console.error(`showUserById:`, error)
      throw new Error(`Could not find user.`)
    }
  }

  async editUserInfosById(user: UserEdit, id: number): Promise<User> {
    try {
      const { data } = await supabase
        .from("users")
        .update({
          firstname: user.firstname,
          lastname: user.lastname,
          address: user.address,
          zip: user.zip,
          city: user.city,
          country: user.country,
        })
        .eq("id", id)
        .select("*")
        .single()
      return data
    } catch (err) {
      throw new Error(`Cound not change details of user.`)
    }
  }
}
