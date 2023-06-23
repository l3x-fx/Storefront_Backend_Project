// @ts-ignore
import Client from '../database'

export type Order = {
    id?: Number;
    status: string; 
    user_id: string;
    products?: OrderProducts[]
}

export type OrderProducts =  {
    id?: Number;
    product_id: string, 
    order_id: string,
    quantity: string
}

export class OrderStore  {

    async getOrderById(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])    
            conn.release()    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async createOrder(user_id: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()        
            const result = await conn.query(sql, ['active', user_id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not create new order. Error: ${err}`)
        }
    }

    async addProductToOrder(product:OrderProducts): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [product.quantity, product.order_id, product.product_id])
            conn.release()        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add product ${product.product_id} to order ${product.order_id}: ${err}`)
        }
    }

    async showRecentOrderByUserId(id: string): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await Client.connect()   
            const sql1 = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC LIMIT 1;'
            const result = await conn.query(sql1, [id])
            conn.release()    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async showProductsOfOrder(order_id: number): Promise<OrderProducts>  {
        try{
            const sql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [order_id])
            conn.release()
            return result.rows
        }catch{
            throw new Error(`Could not get products of order `)
        }
    }

    async showCompletedOrdersByUser(id: string): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=complete;'
            // @ts-ignore
            const conn = await Client.connect()        
            const result:any = await conn.query(sql, [id])               
            conn.release()        
            return result.rows
        } catch (err) {
            throw new Error(`Could not add completed orders of user user ${id}. Error: ${err}`)
        }
    }

    
    
}