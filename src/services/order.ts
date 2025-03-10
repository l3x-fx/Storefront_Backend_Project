// @ts-ignore
//import Client from "../database"
import { CartItem } from "./product"
import { supabase } from "../database"

export type Order = {
  id?: number
  status: string
  date: string
  user_id: string
  products?: OrderProducts[]
}

export type OrderProducts = {
  id?: Number
  product_id: string
  order_id?: string
  quantity: number
}

export class OrderService {
  async createOrder(user_id: number): Promise<number> {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }
      const newDate: string = new Date().toLocaleDateString("de-DE", options)

      const { data, error } = await supabase
        .from("orders")
        .insert({ status: "active", date: newDate, user_id: user_id })
        .select("id")
        .single()

      if (error) {
        throw new Error(`Could not create new order: ${error.message}`)
      }

      if (!data) {
        throw new Error("Order creation failed, no data returned.")
      }
      return data.id as number
    } catch (error) {
      console.error(`Error in createOrder:`, error)
      throw new Error(`Could not create new order.`)
    }
  }

  async flagOrderInvalid(order_id: number): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status: "invalid" })
        .eq("id", order_id)
        .select("id")
        .single()

      if (error) {
        throw new Error(`Could now flag order ${order_id} as invalid.`)
      }
      if (!data) {
        throw new Error("Flagging failed, no data returned.")
      }
      return data.id as number
    } catch (error) {
      console.error(`Error in flagOrderInvalid:`, error)
      throw new Error(`Could now flag order ${order_id} as invalid.`)
    }
  }

  async addProductToOrder(order_id: number, product: CartItem): Promise<OrderProducts> {
    try {
      const { data, error } = await supabase
        .from("order_products")
        .insert({ quantity: product.quantity, order_id: order_id, product_id: product.id })
        .select("id")
        .single()
      if (error) {
        throw new Error(`Could not add ${product.name} to order ${order_id}: `)
      }
      if (!data) {
        throw new Error("Adding product to order failed, no data returned.")
      }
      return data as OrderProducts
    } catch (error) {
      console.error(`Error in addProductToOrder:`, error)
      throw new Error(`Could not add ${product.name} to order ${order_id}: `)
    }
  }

  async getAllOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      const { data, error } = await supabase.from("orders").select("*").eq("user_id", user_id)

      if (error) {
        throw new Error(`Could not find orders.`)
      }
      if (!data || data.length === 0) return []

      const ordersWithProducts = await Promise.all(
        data.map(async (order) => {
          const products = await this.showProductsOfOrder(order.id)
          return { ...order, products }
        })
      )

      return ordersWithProducts as Order[]
    } catch (error) {
      console.error(`Error in getAllOrdersByUserId:`, error)
      throw new Error(`Could not show orders of user. `)
    }
  }

  async getOrderByUserId(order_id: number, user_id: number): Promise<Order> {
    console.log(order_id)
    console.log(user_id)
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", order_id)
        .eq("user_id", user_id)
        .single()

      if (error) throw new Error(`Could not find order: ${error.message}`)
      console.log(data)
      const productsOfOrder: OrderProducts[] = await this.showProductsOfOrder(data.id as number)
      const updatedOrder: Order = {
        id: data.id,
        status: data.status,
        date: data.date,
        user_id: data.user_id,
        products: productsOfOrder,
      }
      return updatedOrder
    } catch (error) {
      console.error(`Error in getOrderByUserId:`, error)
      throw new Error(`Could not find order ${order_id}.`)
    }
  }

  async showProductsOfOrder(order_id: number): Promise<OrderProducts[]> {
    try {
      const { data, error } = await supabase
        .from("order_products")
        .select("product_id, quantity")
        .eq("order_id", order_id)

      if (error) {
        throw new Error(`Could not get products of order.`)
      }
      return data
    } catch (error) {
      console.error(`Error in showProductsOfOrder:`, error)
      throw new Error(`Could not get products of order.`)
    }
  }
}
