// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env
const pepper = BCRYPT_PASSWORD
const saltRounds = SALT_ROUNDS

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
            
            const hash = bcrypt.hashSync(
                user.password + pepper,
            // @ts-ignore
                parseInt(saltRounds)
            );
            console.log(hash)
            const result:any = await conn.query(sql, [user.firstname, user.lastname, hash])
            conn.release()        
            return result.rows[0]     
        } catch (err) {
            throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. Error: ${err}`)
        }
    }
    

    async authenticate(firstname: string, lastname:string, password: string): Promise<User | null> {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT password_digest FROM users WHERE firstname=($1) AND lastname=($2)'
        const result = await conn.query(sql, [firstname, lastname])

        console.log(password+pepper)
        
        if(result.rows.length) {

            const user = result.rows[0]
            console.log(user)

            if (bcrypt.compareSync(password+pepper, user.password_digest)) {
            return user
            }
        }
        return null
    }
}