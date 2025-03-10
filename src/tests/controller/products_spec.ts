import { app } from "../../app"
import supertest from "supertest"
import { ProductService } from "../../services/product"
import { User } from "../../services/user"
import { CartItem, Product } from "../../services/product"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const { TOKEN_SECRET } = process.env
const service = new ProductService()
const request = supertest(app)

const MockUser: User = {
  id: 1,
  email: "tom@bom.ba",
  firstname: "Tom",
  lastname: "Bombadil",
  password: "pw123",
  address: "woodroad",
  zip: 123,
  city: "forest",
  country: "woodlands",
}

const token = jwt.sign({ user: MockUser }, TOKEN_SECRET as Secret)

const MockProduct: Product = {
  id: 1,
  name: "Narsil",
  description: "evil thing",
  category: "Weapon",
  img_url: "img.url",
  price: 123,
}
const MockCartItem: CartItem = {
  id: 1,
  name: "Narsil",
  description: "evil thing",
  category: "Weapon",
  img_url: "img.url",
  price: 123,
  quantity: 3,
}

beforeAll(() => {
  spyOn(service, "getAllProducts").and.returnValue(Promise.resolve([MockProduct]))
  spyOn(service, "getProductById").and.returnValue(Promise.resolve(MockProduct))

  spyOn(service, "getProductByCategory").and.returnValue(Promise.resolve([MockProduct]))
  spyOn(service, "getTopThreeProducts").and.returnValue(Promise.resolve([MockCartItem]))
})

describe("Products endpoint tests", () => {
  it("GET /products should return a list of products ", async () => {
    const response = await request.get("/products").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([MockProduct])
  })
  it("GET /products/:id  should return a user", async () => {
    const response = await request.get("/products/1").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(MockProduct)
  })
  it("POST /products without body should return the product", async () => {
    const response = await request.post("/products").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(MockProduct)
  })
  it("GET /products/stats/topFive should return the top five products", async () => {
    const response = await request.get("/products/stats/topFive").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([MockProduct])
  })
  it("GET /products/category/:category should return a product", async () => {
    const response = await request.get("/products/category/Weapon").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([MockProduct])
  })
})
