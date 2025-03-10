import express, { Request, Response } from "express"
import bodyParser from "body-parser"
//@ts-ignore
import cors from "cors"
import users_routes from "./controller/users"
import products_routes from "./controller/products"
import orders_routes from "./controller/orders"
import { rateLimit } from "express-rate-limit"

export const app: express.Application = express()
const address: string = "8080"

app.use(bodyParser.json())
app.use(cors())

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)

app.listen(address, function () {
  console.log(`starting app on: ${address}`)
})

app.get("/", function (_req: Request, res: Response) {
  res.send("Server is ready!")
})
users_routes(app)
products_routes(app)
orders_routes(app)
