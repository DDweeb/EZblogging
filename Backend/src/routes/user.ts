import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signupInput } from '@vidhigaba07/medium-common';
import { cors } from 'hono/cors'

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.use('/*', cors())

userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const mykey = c.env.JWT_SECRET;
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.text("Wrong Inputs Entered");
  }

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    }
  })

  if (user) {
    return c.text("User Already Exists");
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        name: body.name,
        password: body.password
      }
    })
    const token = await sign({ id: newUser.id }, mykey);
    return c.text(token);
  }
  catch (e) {
    return c.text('Cant Signup', 500);
  }
})

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const mykey = c.env.JWT_SECRET;
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      username: body.username
    }
  })

  if (!user) {
    return c.text("Wrong Inputs Entered")
  }

  const token = await sign({ id: user.id }, mykey);
  return c.text(token)
})

export default userRouter