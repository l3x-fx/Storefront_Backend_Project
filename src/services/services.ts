// @ts-ignore
import Client from '../database'
import { Order } from '../models/order'
import { Product } from '../models/product'
import { OrderProducts } from '../models/order'

export class ServiceStore {

    async showTopFiveProducts(): Promise<Product> {
        try {
            const sql = 'SELECT product_id, COUNT(product_id) AS Count FROM order_products GROUP BY product_id ORDER BY Count DESC LIMIT 5;'
            // @ts-ignore
            const conn = await Client.connect()
            const result:any = await conn.query(sql)
            conn.release()        
            return result.rows  
        } catch (err) {
            throw new Error(`Could not get Top 5 products. Error: ${err}`)
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


//SELECT * FROM orders WHERE user_id=($1) AND status=completed JOIN order_products ON orders.id=order_products.order_id