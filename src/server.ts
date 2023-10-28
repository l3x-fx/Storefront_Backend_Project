import express, { Request, Response } from "express"
import bodyParser from "body-parser"
//@ts-ignore
import cors from "cors"
import users_routes from "./handlers/users"
import products_routes from "./handlers/products"
import orders_routes from "./handlers/oders"

export const app: express.Application = express()
const address: string = "8080"

app.use(bodyParser.json())
app.use(cors())

app.listen(address, function () {
  console.log(`starting app on: ${address}`)
})

app.get("/", function (_req: Request, res: Response) {
  res.send("Server is ready!")
})

users_routes(app)
products_routes(app)
orders_routes(app)
