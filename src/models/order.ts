// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'

dotenv.config()
//const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env

export type Order = {
    id?: Number;
    status: string; 
    user_id: number;
    products?: OrderProducts[]
}

export type OrderProducts =  {
    id?: Number;
    product_id: number, 
    order_id: number,
    quantity: number
}

export class OrderStore  {
    async index(): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await Client.connect()   
            const sql = 'SELECT * FROM orders '
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not get orders: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM users WHERE order_id=($1)'
            // @ts-ignore
            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])    
            conn.release()    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async create(user_id: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES(active, $1) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()        
            const result = await conn.query(sql, [user_id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not create new order. Error: ${err}`)
        }
    }

    async addProductToOrder(quantity: number, order_id: string, product_id: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()
            const result = await conn
                .query(sql, [quantity, order_id, product_id])
            conn.release()        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
        }
    }
    

    
    
}