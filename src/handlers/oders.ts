import express, { Request, Response } from "express"
import { OrderStore } from "../models/order"
import { CartItem } from "../models/product"
import { authorizeUser } from "../auth/auth"

export const store = new OrderStore()

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrderId: number = await store.createOrder(parseInt(req.params.userId))
    const products = req.body
    const order = await Promise.all(
      products.map(async (product: CartItem) => {
        try {
          await store.addProductToOrder(newOrderId, product)
        } catch (err) {
          await store.flagOrderInvalid(newOrderId)
          const result = (err as Error).message
          res.status(401).json({ error: result })
        }
      })
    )
    res.json(newOrderId)
  } catch (err) {
    const result = (err as Error).message
    res.status(400).json({ error: result })
  }
}

const getAllOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const order = await store.getAllOrdersByUserId(parseInt(req.params.userId))
    res.json(order)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const getOrderByUserId = async (req: Request, res: Response) => {
  try {
    const order = await store.getOrderByUserId(parseInt(req.params.orderId), parseInt(req.params.userId))
    res.json(order)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const orders_routes = (app: express.Application) => {
  app.post("/orders/:userId", authorizeUser, createOrder)
  app.get("/orders/:userId", authorizeUser, getAllOrdersByUserId)
  app.get("/orders/:userId/:orderId", authorizeUser, getOrderByUserId)
}

export default orders_routes
