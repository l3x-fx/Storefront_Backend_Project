// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env
const pepper = BCRYPT_PASSWORD
const saltRounds = SALT_ROUNDS

export type User = {
    password_digest?: string  
    id?: Number;
    username: string;
    firstname: string; 
    lastname: string;
    password?: string;
}

export class UserStore  {
    async index(): Promise<User []> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not get users: ${err}`)
        }
        
    }

    async showUserById(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])    
            conn.release()    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
    
    async create(user: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()     
            
            const hash = bcrypt.hashSync(
                //@ts-ignore
                user.password + pepper,
            // @ts-ignore
                parseInt(saltRounds)
            );
            const result = await conn.query(sql, [user.username, user.firstname, user.lastname, hash])
            conn.release()        
            return result.rows[0]     
        } catch (err) {
            throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. Error: ${err}`)
        }
    }
}