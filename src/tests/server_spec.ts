import supertest from "supertest"
import { app } from "../app"

const request = supertest(app)

describe("Root endpoint test", () => {
  it("GET / should return status 200 ", async () => {
    const response = await request.get("/")
    expect(response.statusCode).toBe(200)
  })
})
