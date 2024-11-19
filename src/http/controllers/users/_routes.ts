import type { FastifyInstance } from 'fastify'
import { autheticate } from './autheticate'
import { refresh } from './refresh'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', autheticate)
  app.patch('/token/refresh', refresh)
}
