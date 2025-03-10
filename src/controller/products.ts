import express, { Request, Response } from "express"
import { ProductService } from "../services/product"

export const productService = new ProductService()

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts()
    res.json(products)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(parseInt(req.params.id))
    res.json(product)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductByCategory(req.params.category)
    res.json(product)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const getTopThreeProducts = async (_req: Request, res: Response) => {
  try {
    const topFive = await productService.getTopThreeProducts()
    res.json(topFive)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const users_routes = (app: express.Application) => {
  app.get("/products", getAllProducts)
  app.get("/products/:id", getProductById)
  app.get("/products/stats/topThree", getTopThreeProducts)
  app.get("/products/category/:category", getProductByCategory)
}

export default users_routes
