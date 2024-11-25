import type { FastifyInstance } from 'fastify'
import { autheticate } from './authenticate/autheticate'
import { refresh } from './refresh/refresh'
import { register } from './register/register'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', autheticate)
  app.patch('/token/refresh', refresh)
}
