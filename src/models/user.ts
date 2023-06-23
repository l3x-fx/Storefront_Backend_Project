// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'

dotenv.config()
//const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env

export type User = {
    id?: Number;
    firstname: string; 
    lastname: string;
    password: string;
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

    async show(id: string): Promise<User> {
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
            const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()        
            const result:any = await conn.query(sql, [user.firstname, user.lastname, user.password])        
            const weaponresult:any = result.rows[0]        
            conn.release()        
            return weaponresult
        } catch (err) {
            throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. Error: ${err}`)
        }
    }
    
}