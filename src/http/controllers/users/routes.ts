import type { FastifyInstance } from "fastify"
import { autheticate } from "./autheticate"
import { register } from "./register"
import { refresh } from "./refresh"

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', autheticate)
  app.patch('/token/refresh', refresh)
}