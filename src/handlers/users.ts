import express, { Request, Response } from "express"

import { User, UserLogin } from "../models/user"
import { UserStore } from "../models/user"
import dotenv from "dotenv"
import jwt, { Secret } from "jsonwebtoken"
import { authorizeUser } from "../auth/auth"

dotenv.config()
const { TOKEN_SECRET } = process.env

export const store = new UserStore()

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
    }
    const newUser = await store.signup(user)

    let token = jwt.sign({ user: newUser }, TOKEN_SECRET as Secret)
    res.status(201).json({ user: newUser, token: token })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const user: UserLogin = req.body.user
    const loggedInUser: User = await store.login(user)
    let token = jwt.sign({ userId: loggedInUser }, TOKEN_SECRET as Secret)
    res.json({ user: loggedInUser, token: token })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}

const showUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await store.showUserById(userId)
    res.json(user)
  } catch (error) {
    res.status(401).json({ error })
  }
}

const editUserInfosById = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    const userId = parseInt(req.params.userId)
    const newUser = await store.editUserInfosById(user, userId)
    res.json(newUser)
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}

const users_routes = (app: express.Application) => {
  app.post("/signup", signup)
  app.get("/login", login)
  app.get("/users/:userId", authorizeUser, showUserById)
  app.put("/users/:userId", authorizeUser, editUserInfosById)
}

export default users_routes
