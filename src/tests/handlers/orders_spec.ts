import { app } from "../../server"
import supertest from "supertest"
import { store } from "../../handlers/oders"
import { User } from "../../models/user"
import { Order, OrderProducts } from "../../models/order"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const { TOKEN_SECRET } = process.env

const request = supertest(app)

const MockUser: User = {
  id: 1,
  email: "tombom@middle.earth",
  firstname: "Tom",
  lastname: "Bombadil",
  password: "pw123",
  address: "roadway",
  zip: 123,
  city: "treetown",
  country: "woodland",
}

const token = jwt.sign({ user: MockUser }, TOKEN_SECRET as Secret)

const MockOrder: Order = {
  id: 1,
  status: "active",
  date: "1one1",
  user_id: "1",
  products: [],
}

const MockOrderProducts: OrderProducts = {
  id: 1,
  product_id: "1",
  order_id: "1",
  quantity: 1,
}

beforeAll(() => {
  spyOn(store, "getOrderByUserId").and.returnValue(Promise.resolve(MockOrder))
  spyOn(store, "createOrder").and.returnValue(Promise.resolve(1))
  spyOn(store, "addProductToOrder").and.returnValue(Promise.resolve(MockOrderProducts))
})

describe("Orders endpoint tests", () => {
  it("GET /orders/:orderId should return a list of products ", async () => {
    const response = await request.get("/orders/1").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(MockOrder)
  })
  it("POST /orders should return an order", async () => {
    const response = await request.post("/orders").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(MockOrder)
  })
  it("POST /orders/:orderId/products should return an OrderProduct", async () => {
    const response = await request.post("/orders/1/products").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(MockOrderProducts)
  })
  it("GET users/:userId/order/recent should return an order", async () => {
    const response = await request.get("/users/:userId/order/recent").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(MockOrder)
  })
  it("GET /users/:userId/order/recent should return an order", async () => {
    const response = await request.get("/users/1/order/recent").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(MockOrder)
  })
  it("GET /users/:userId/order/completed should return an order", async () => {
    const response = await request.get("/users/1/order/completed").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([MockOrder])
  })
})
