// @ts-ignore
import Client from "../../database"
import { Product, ProductService } from "../../services/product"

const service = new ProductService()

afterEach(async () => {
  //@ts-ignore
  const conn = await Client.connect()
  const sql = "DELETE FROM products WHERE name = $1"
  const user = "Hobbit Ale"

  try {
    await conn.query(sql, [user])
    conn.release()
  } catch (err) {
    console.error("Error deleting product:", err)
  }
})

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(service.getAllProducts).toBeDefined()
  })
  it("should have showProductById method", () => {
    expect(service.getProductById).toBeDefined()
  })

  it("should have an showProductByCategory method", () => {
    expect(service.getProductByCategory).toBeDefined()
  })
  it("should have showTopFiveProducts method", () => {
    expect(service.getTopThreeProducts).toBeDefined()
  })
})

describe("Product Model Methods", () => {
  it("index method should return a list of products", async () => {
    const result = await service.getAllProducts()
    expect(result.length).toBeGreaterThan(6)
  })

  it("showProductById method should return a product by ID", async () => {
    const result = await service.getProductById(1)

    const ReturnProduct: Product = {
      id: 1,
      name: "The One Ring",
      description: "quite round and shiny",
      img_url: "funky@shiny.com",
      price: 999,
      category: "Jewelry",
    }

    expect(result).toEqual(ReturnProduct)
  })

  it("showProductByCategory method should show all products of a given category", async () => {
    const result = await service.getProductByCategory("Jewelry")
    expect(result.length).toEqual(2)
  })

  it("showTopFiveProducts method should show the 5 most ordered products", async () => {
    const result = await service.getTopThreeProducts()

    expect(result[0].quantity).toBeGreaterThanOrEqual(result[1].quantity as number)
    expect(result[1].quantity).toBeGreaterThanOrEqual(result[2].quantity as number)
    expect(result[2].quantity).toBeGreaterThanOrEqual(result[3].quantity as number)
    expect(result[3].quantity).toBeGreaterThanOrEqual(result[4].quantity as number)
    expect(result[0].name).toEqual("Anduril")
  })
})
