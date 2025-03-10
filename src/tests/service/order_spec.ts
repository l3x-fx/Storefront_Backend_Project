// @ts-ignore
import Client from "../../database"
import { Order, OrderProducts, OrderService } from "../../services/order"
import { CartItem } from "../../services/product"

const service = new OrderService()

afterEach(async () => {
  //@ts-ignore
  const conn = await Client.connect()
  const sql1 = "DELETE FROM orders WHERE id > 14"
  const sql2 = "DELETE FROM order_products WHERE id > 22"

  try {
    await conn.query(sql1)
    await conn.query(sql2)
    conn.release()
  } catch (err) {
    console.error("Error deleting user:", err)
  }
})

describe("Order Model", () => {
  it("should have an getOrderById method", () => {
    expect(service.getOrderByUserId).toBeDefined()
  })
  it("should have createOrder method", () => {
    expect(service.createOrder).toBeDefined()
  })
  it("should have addProductToOrder method", () => {
    expect(service.addProductToOrder).toBeDefined()
  })

  it("should have an showProductsOfOrder method", () => {
    expect(service.showProductsOfOrder).toBeDefined()
  })
})
describe("Order Model Methods", () => {
  it("getOrderByUserId method should return an order by ID", async () => {
    const result: Order = await service.getOrderByUserId(1, 1)
    const ReturnOrder: Order = {
      id: 1,
      status: "complete",
      user_id: "4",
      products: [{ product_id: "1", quantity: 2 }],
      date: "",
    }
    expect(result).toEqual(ReturnOrder)
  })

  it("createOrder method should create an empty order and return it", async () => {
    const result = await service.createOrder(1)

    const ReturnOrder: Order = {
      id: 15,
      status: "active",
      user_id: "1",
      date: "",
    }

    expect(result).toEqual(1)
  })

  it("addProductToOrder method should add a product to the order and return it", async () => {
    const MockProduct: OrderProducts = {
      quantity: 6,
      order_id: "2",
      product_id: "3",
    }

    const ReturnOrderProduct: OrderProducts = {
      id: 23,
      order_id: "2",
      product_id: "3",
      quantity: 6,
    }
    const MockCartItem: CartItem = {
      id: 1,
      name: "name",
      description: "descr",
      img_url: "http.bla",
      price: 123,
      category: "stuff",
      quantity: 6,
    }

    const result = await service.addProductToOrder(1, MockCartItem)

    expect(result).toEqual(ReturnOrderProduct)
  })

  it("showProductsOfOrder should return all products of an existing order", async () => {
    const result = await service.showProductsOfOrder(7)
    const ReturnOrderProduct: OrderProducts[] = [
      {
        product_id: "2",
        quantity: 1,
      },
    ]
    expect(result).toEqual(ReturnOrderProduct)
  })
})
