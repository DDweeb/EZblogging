import { Hono } from 'hono'
import mainApp from './routes'

const app = new Hono()

app.route("/api/v1/", mainApp)

export default app