// @ts-ignore
import Client from "../../database"
import { User, UserService } from "../../services/user"

const serivce = new UserService()

afterEach(async () => {
  //@ts-ignore
  const conn = await Client.connect()
  const sql = "DELETE FROM users WHERE username = $1"
  const user = "testuser"

  try {
    await conn.query(sql, [user])
    conn.release()
  } catch (err) {
    console.error("Error deleting user:", err)
  }
})

describe("User Model", () => {
  it("should have showUserById method", () => {
    expect(serivce.showUserById).toBeDefined()
  })
  it("should have signup method", () => {
    expect(serivce.signup).toBeDefined()
  })
})
describe("User Model Methods", () => {
  it("showUserById method should return a user", async () => {
    const result = await serivce.showUserById(1)

    const ReturnUser = {
      id: 1,
      email: "fro@do.ba",
      firstname: "Frodo",
      lastname: "Baggins",
      password_digest: "password1",
      password: "pw",
      address: "hillrd 1",
      zip: 123,
      city: "Hobbingen",
      country: "Shire",
    }

    expect(result).toEqual(ReturnUser)
  })

  it("create method should create a user return that user", async () => {
    const mockUser: User = {
      email: "test@user",
      firstname: "Test",
      lastname: "User",
      password_digest: "testpw",
      password: "pw",
      address: "hillrd 1",
      zip: 123,
      city: "Hobbingen",
      country: "Shire",
    }
    const result = await serivce.signup(mockUser)

    expect(result.email).toEqual("test@user")
    expect(result.firstname).toEqual("Test")
    expect(result.lastname).toEqual("User")
  })
})
