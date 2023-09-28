import express, { Request, Response } from "express"
import { ProductStore } from "../models/product"

export const store = new ProductStore()

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const product = await store.getAllProducts()
    res.json(product)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await store.getProductById(parseInt(req.params.id))
    res.json(product)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const product = await store.getProductByCategory(req.params.category)
    res.json(product)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const getTopFiveProducts = async (_req: Request, res: Response) => {
  try {
    const topFive = await store.getTopFiveProducts()
    res.json(topFive)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}
const users_routes = (app: express.Application) => {
  app.get("/products", getAllProducts)
  app.get("/products/:id", getProductById)
  app.get("/products/stats/topFive", getTopFiveProducts)
  app.get("/products/category/:category", getProductByCategory)
}

export default users_routes
