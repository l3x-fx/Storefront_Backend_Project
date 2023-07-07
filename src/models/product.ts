// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'

dotenv.config()
//const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env

export type Product = {
    id?: Number;
    name: string; 
    description: string;
    url:string;
    price: number;
    category: string;
    total_quantity?: number;
}

export class ProductStore  {
    async index(): Promise<Product []> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not get products: ${err}`)
        }        
    }

    async showProductById(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])    
            conn.release()    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        } 
    }

    async createNewProduct(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()        
            const result = await conn.query(sql, [product.name, product.price, product.category])        
            const newProduct = result.rows[0]        
            conn.release()        
            return newProduct
        } catch (err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`)
        }
    }

    async showProductByCategory(category: string): Promise<Product []> {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)'
            // @ts-ignore
            const conn = await Client.connect()    
            const result = await conn.query(sql, [category])    
            conn.release()    
            return result.rows
        } catch (err) {
            throw new Error(`Could not find category ${category}. Error: ${err}`)
        } 
    }

    async showTopFiveProducts(): Promise<Product []> {
        try {
            const sql = 'SELECT product_id AS id, SUM(quantity) AS total_quantity FROM order_products GROUP BY product_id ORDER BY total_quantity DESC LIMIT 5;'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql)
            conn.release()   

            const productsShort = result.rows

            const products = await Promise.all(
                productsShort.map(async (product: { id: number, total_quantity:number }) => {
                    try{
                        const result = await this.showProductById(product.id)

                        const updatedProduct: Product = {
                            id: product.id,
                            name: result.name,
                            price: result.price,
                            description: result.description,
                            url: result.url,
                            category: result.category,
                            total_quantity: product.total_quantity                
                        };
                        
                        return updatedProduct;

                    } catch (err) {
                        throw new Error(`Could not get product ${product.id}. Error: ${err}`)
                    }
                })
            );
            return products
        } catch (err) {
            throw new Error(`Could not get Top 5 products. Error: ${err}`)
        }
    }
    
}