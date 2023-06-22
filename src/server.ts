import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
//@ts-ignore
import cors from 'cors'
import { Order } from './models/order'
import { Product } from './models/product'
import { User } from './models/user'
import users_routes from './handlers/users'
import products_routes from './handlers/products'
import orders_routes from './handlers/oders'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions= {
    optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

users_routes(app)
products_routes(app)
orders_routes(app)