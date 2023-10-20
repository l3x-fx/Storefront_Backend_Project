// @ts-ignore
import Client from "../database"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

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

export class UserStore {
  async confirmFreeEmail(email: string): Promise<boolean> {
    try {
      const sql = "Select * FROM users WHERE email=($1)"
      // @ts-ignore
      const conn = await Client.connect()
      //@ts-ignore
      const result = await conn.query(sql, [email])
      conn.release()
      const user = result.rows[0]
      return !!user
    } catch (err) {
      throw new Error(`Database Error!`)
    }
  }

  async signup(user: User): Promise<User> {
    try {
      const emailExists = await this.confirmFreeEmail(user.email)

      if (emailExists) {
        throw new Error(`Email ${user.email} is already in use.`)
      }

      const sql =
        "INSERT INTO users (email, firstname, lastname, password_digest, address, zip, city, country) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
      // @ts-ignore
      const conn = await Client.connect()
      //@ts-ignore
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds))
      const result = await conn.query(sql, [
        user.email,
        user.firstname,
        user.lastname,
        hash,
        user.address,
        user.zip,
        user.city,
        user.country,
      ])
      conn.release()
      return result.rows[0]
    } catch (err: Error | unknown) {
      console.log(err)
      throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. ${err}`)
    }
  }

  async login(userLogin: UserLogin): Promise<User> {
    try {
      const sql = "Select * FROM users WHERE email=($1)"
      // @ts-ignore
      const conn = await Client.connect()
      //@ts-ignore
      const result = await conn.query(sql, [userLogin.email])
      conn.release()
      const user = result.rows[0]
      if (!user) {
        throw new Error(`Email or password incorrect.`)
      }

      const passwordMatch = await bcrypt.compare(userLogin.password + pepper, user.password_digest)
      if (passwordMatch) {
        return user
      } else {
        throw new Error(`Email or password incorrect.`)
      }
    } catch (err) {
      throw new Error(`Database Error!`)
    }
  }

  async showUserById(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)"
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user.`)
    }
  }

  async editUserInfosById(user: UserEdit, id: number): Promise<User> {
    try {
      const sql =
        "UPDATE users SET firstname = $1, lastname = $2, address = $3, zip = $4, city = $5, country = $6 WHERE id = $7 RETURNING *"
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.address,
        user.zip,
        user.city,
        user.country,
        id,
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cound not change details of user.`)
    }
  }
}
