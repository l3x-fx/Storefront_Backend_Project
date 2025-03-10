import express, { Request, Response } from "express"

import { User, UserLogin, UserEdit } from "../services/user"
import { UserService } from "../services/user"
import dotenv from "dotenv"
import jwt, { Secret } from "jsonwebtoken"
import { authorizeUser } from "../auth/auth"

dotenv.config()
const { TOKEN_SECRET } = process.env

export const userService = new UserService()

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

    const newUser = await userService.signup(user)
    let token = jwt.sign({ user: newUser }, TOKEN_SECRET as Secret)
    res.status(201).json({ user: newUser, token: token })
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const user: UserLogin = req.body.user
    const loggedInUser: User = await userService.login(user)
    let token = jwt.sign({ user: loggedInUser }, TOKEN_SECRET as Secret)
    res.json({ user: loggedInUser, token: token })
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const showUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await userService.showUserById(userId)
    res.json(user)
  } catch (err) {
    const result = (err as Error).message
    res.status(401).json({ error: result })
  }
}

const editUserInfosById = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const userId = parseInt(req.params.userId)
    const newUser = await userService.editUserInfosById(user, userId)
    res.json(newUser)
  } catch (err) {
    const result = (err as Error).message
    console.log(result)
    res.status(401).json({ error: result })
  }
}

const users_routes = (app: express.Application) => {
  app.post("/signup", signup)
  app.post("/login", login)
  app.get("/users/:userId", authorizeUser, showUserById)
  app.put("/users/:userId", authorizeUser, editUserInfosById)
}

export default users_routes
