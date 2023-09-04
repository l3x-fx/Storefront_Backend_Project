import express, { Request, Response } from "express";

import { User, UserLogin } from "../models/user";
import { UserStore } from "../models/user";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { verifyAuthToken, authorizeUser } from "../auth/auth";

dotenv.config();
const { TOKEN_SECRET } = process.env;

export const store = new UserStore();

const signup = async (req: Request, res: Response) => {
  try {
    const user: User = {
      email: req.body.user.email,
      firstname: req.body.user.firstname,
      lastname: req.body.user.lastname,
      password: req.body.user.password,
      address: "",
      zip: 0,
      city: "",
      country: "",
    };
    const newUser = await store.signup(user);

    let token = jwt.sign({ user: newUser }, TOKEN_SECRET as Secret);
    res.json(token);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user: UserLogin = req.body.user;
    const loggedInUser: User = await store.login(user);
    let token = jwt.sign({ user: loggedInUser }, TOKEN_SECRET as Secret);
    res.json(token);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const showUserById = async (req: Request, res: Response) => {
  try {
    const user = await store.showUserById(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const editUserInfosById = async (req: Request, res: Response) => {};

const users_routes = (app: express.Application) => {
  app.post("/signup", signup);
  app.get("/login", login);
  app.get("/users/:userId", authorizeUser, showUserById);
  app.put("/users/:userId", authorizeUser, editUserInfosById);
};

export default users_routes;
