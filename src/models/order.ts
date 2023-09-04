// @ts-ignore
import Client from "../database";
import { CartItem, Product } from "./product";

export type Order = {
  id?: number;
  status: string;
  date: string;
  user_id: string;
  products?: OrderProducts[];
};

export type OrderProducts = {
  id?: Number;
  product_id: string;
  order_id?: string;
  quantity: number;
};

export class OrderStore {
  async getAllOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql1 = "SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC";
      const orderShort = await conn.query(sql1, [user_id]);
      conn.release();
      const orders = await Promise.all(
        orderShort.rows.map(
          async (order: {
            id: number;
            status: string;
            date: string;
            user_id: string;
          }) => {
            try {
              const result = await this.showProductsOfOrder(order.id);
              const updatedOrder: Order = {
                id: order.id,
                status: order.status,
                date: order.date,
                user_id: order.user_id,
                products: result,
              };
              return updatedOrder;
            } catch (err) {
              throw new Error(
                `Could not find products for  ${order.id}. Error: ${err}`
              );
            }
          }
        )
      );
      return orders;
    } catch (err) {
      throw new Error(
        `Could not show orders of user user ${user_id}. Error: ${err}`
      );
    }
  }

  async getOrderByUserId(order_id: number, user_id: number): Promise<Order> {
    try {
      const sql1 = "SELECT * FROM orders WHERE id=($1) AND user_id=($2)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql1, [order_id, user_id]);
      conn.release();
      const order: Order = result.rows[0];
      const productsOfOrder: OrderProducts[] = await this.showProductsOfOrder(
        order.id as number
      );

      const updatedOrder: Order = {
        id: order.id,
        status: order.status,
        date: order.date,
        user_id: order.user_id,
        products: productsOfOrder,
      };
      return updatedOrder;
    } catch (err) {
      throw new Error(`Could not find order ${order_id}. Error: ${err}`);
    }
  }

  async createOrder(user_id: number): Promise<number> {
    try {
      const sql =
        "INSERT INTO orders (status, date, user_id) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      const newDate: string = new Date().toLocaleDateString("de-DE", options);
      console.log(newDate);
      const result = await conn.query(sql, ["active", newDate, user_id]);
      const order = result.rows[0];
      conn.release();

      return order.id;
    } catch (err) {
      throw new Error(`Could not create new order. Error: ${err}`);
    }
  }

  async addProductToOrder(
    order_id: number,
    product: CartItem
  ): Promise<OrderProducts> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.quantity,
        order_id,
        product.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${product.id} to order ${order_id}: ${err}`
      );
    }
  }

  async showProductsOfOrder(order_id: number): Promise<OrderProducts[]> {
    try {
      const sql =
        "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch {
      throw new Error(`Could not get products of order `);
    }
  }
}
