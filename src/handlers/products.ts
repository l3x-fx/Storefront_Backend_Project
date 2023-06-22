import express, { Request, Response, NextFunction } from 'express'

import { Product } from "../models/product"
import { ProductStore } from '../models/product'
import dotenv from 'dotenv'
import { ServiceStore } from '../services/dashboard'

//import jwt from 'jsonwebtoken'

dotenv.config()
const {TOKEN_SECRET} = process.env

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const product = await store.index()
    res.json(product)
}

const showById = async (req: Request, res: Response) => {
    const product = await store.showById(req.body.id)
    res.json(product)
}

const create = async (req: Request, res: Response) => { 
    const product: Product = { name: req.body.name, price: req.body.price, category: req.body.category } 
    const newProduct = await store.create(product) 
    res.json(newProduct)
}

const showByCategory = async (req: Request, res: Response) => {
    const product = await store.showByCategory(req.body.category)
    res.json(product)
}

const users_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', showById)
    app.post('/products', create)
    app.get('products/:category', showByCategory)
}

export default users_routes
