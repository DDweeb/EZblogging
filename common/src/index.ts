import z from 'zod';

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string().optional()
})

export type signupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string()
})

export type signininput = z.infer<typeof signinInput>

export const initializePost = z.object({
    title: z.string(),
    content: z.string()
})

export type initializePost = z.infer<typeof initializePost>

export const updateBlog = z.object({
    title: z.string().optional(),
    contemt: z.string().optional()
})

export type updateBlog = z.infer<typeof updateBlog>

