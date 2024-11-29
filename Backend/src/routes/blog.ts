import { Hono } from 'hono'
import { verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors';

const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: any
  }
}>();

blogrouter.use('/*', cors())
blogrouter.use("/*", async (c, next) => {
  const mykey = c.env.JWT_SECRET;
  const jwt = c.req.header("Authorization")

  if (!jwt) {
    return c.text("Unauthorized", 401)
  }

  const decoded = await verify(jwt, mykey)

  if (!decoded) {
    return c.text("Unauthorized token", 401)
  }
  c.set('userId', decoded.id);
  await next();
})


blogrouter.post("/new", async (c) => {
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      autherId: userId,
      tagline: body.tagline,
      date: formattedDate
    }
  })
  return c.json({
    postId: post.id
  })
})


blogrouter.put('/:postId', async (c) => {
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const postId = c.req.param('postId');
  const body = await c.req.json();

  await prisma.post.update({
    where: {
      id: postId,
      autherId: userId
    },
    data: {
      title: body.title,
      content: body.content
    }
  })
  return c.text("blog updated")
})

blogrouter.get("/filter", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const query = c.req.query();
  const filter = query.filter || "";
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: filter,
        mode: "insensitive"
      }
    }
  })

  return c.json(posts)
})


blogrouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("bulk")
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      content: true,
      title: true,
      date: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json(posts);
})

blogrouter.get("/:id", async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const post = await prisma.post.findUnique({
    where: {
      id: id
    }, select: {
      id: true,
      title: true,
      content: true,
      tagline: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })
  return c.json(post)
})



export default blogrouter           