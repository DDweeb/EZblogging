import { Hono } from 'hono'
import userRouter from "./user";
import blogrouter from "./blog";

const mainApp = new Hono()

mainApp.route("/user", userRouter)
mainApp.route("/blog", blogrouter)

export default mainApp; 