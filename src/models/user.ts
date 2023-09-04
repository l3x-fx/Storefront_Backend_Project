// @ts-ignore
import Client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;

export type User = {
  password_digest?: string;
  id?: Number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  address: string;
  zip: number;
  city: string;
  country: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export class UserStore {
  async showUserById(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async signup(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (email, firstname, lastname, password_digest, address, zip, city, country) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      //@ts-ignore
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
      console.log(hash);
      const result = await conn.query(sql, [
        user.email,
        user.firstname,
        user.lastname,
        hash,
        user.address,
        user.zip,
        user.city,
        user.country,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. Error: ${err}`);
    }
  }

  async login(userLogin: UserLogin): Promise<User> {
    try {
      const sql = "Select * FROM users WHERE email=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      //@ts-ignore
      const result = await conn.query(sql, [userLogin.email]);
      conn.release();
      const user = result.rows[0];
      if (!user) {
        throw new Error(`Email or password incorrect.`);
      }

      const passwordMatch = await bcrypt.compare(userLogin.password + pepper, user.password_digest);
      if (passwordMatch) {
        return user;
      }
      throw new Error(`Email or password incorrect.`);
    } catch (err) {
      throw new Error(`Email or password incorrect. Error: ${err}`);
    }
  }
}
