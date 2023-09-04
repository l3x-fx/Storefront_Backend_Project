import express, { Request, Response } from "express";
import { OrderProducts, OrderStore } from "../models/order";
import { CartItem, Product } from "../models/product";
import { verifyAuthToken } from "../auth/auth";

export const store = new OrderStore();

const getAllOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const order = await store.getAllOrdersByUserId(parseInt(req.params.userId));
    res.json(order);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const getOrderByUserId = async (req: Request, res: Response) => {
  try {
    const order = await store.getOrderByUserId(
      parseInt(req.params.orderId),
      parseInt(req.params.userId)
    );
    res.json(order);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrderId: number = await store.createOrder(
      parseInt(req.params.userId)
    );
    const products = req.body.products;
    const order = await Promise.all(
      products.map(async (product: CartItem) => {
        try {
          await store.addProductToOrder(newOrderId, product);
        } catch (error) {
          res.status(401).json({ error });
        }
      })
    );
    res.json(newOrderId);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const orders_routes = (app: express.Application) => {
  app.get("/orders/:userId", verifyAuthToken, getAllOrdersByUserId);
  app.get("/orders/:userId/:orderId", verifyAuthToken, getOrderByUserId);
  app.post("/orders/:userId", verifyAuthToken, createOrder);
};

export default orders_routes;
