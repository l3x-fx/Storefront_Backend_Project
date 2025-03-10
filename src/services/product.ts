// @ts-ignore
// import Client from "../database"
import dotenv from "dotenv"
import { supabase } from "../database"

dotenv.config()
//const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env

export type Product = {
  id: number
  name: string
  description: string
  img_url: string
  price: number
  category: string
}

export type CartItem = Product & {
  quantity: number
}

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase.from("products").select("*")
      if (error) {
        throw new Error("Could not load products.")
      }
      return data as Product[]
    } catch (err) {
      console.log(err)
      throw new Error(`Could not load products.`)
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
      if (error) {
        throw new Error(`Could not find product.`)
      }
      return data as Product
    } catch (err) {
      throw new Error(`Could not load product.`)
    }
  }

  async getProductByCategory(category: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("category", category)
      if (error) {
        throw new Error(`Could not find category ${category}.`)
      }
      return data as Product[]
    } catch (err) {
      throw new Error(`Could not find category ${category}.`)
    }
  }
  //muss noch geändert werden!!!
  async getTopThreeProducts(): Promise<CartItem[]> {
    try {
      const sql =
        "SELECT product_id AS id, SUM(quantity) AS total_quantity FROM order_products GROUP BY product_id ORDER BY total_quantity DESC LIMIT 3;"
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql)
      conn.release()

      const productsShort = result.rows

      const products = await Promise.all(
        productsShort.map(async (product: { id: number; total_quantity: number }) => {
          try {
            const result = await this.getProductById(product.id)

            const updatedProduct: CartItem = {
              id: product.id,
              name: result.name,
              price: result.price,
              description: result.description,
              img_url: result.img_url,
              category: result.category,
              quantity: product.total_quantity,
            }

            return updatedProduct
          } catch (err) {
            throw new Error(`Could not load product.`)
          }
        })
      )
      return products
    } catch (err) {
      throw new Error(`Could not get Top 3 products.`)
    }
  }
}
