import express from "express"
import { login, signup, logout } from "../Controllers/auth.js"
const AuthRouter =  express.Router()

AuthRouter.post('/login', login)

AuthRouter.post('/signup', signup)

AuthRouter.post('/logout', logout)

export default AuthRouter