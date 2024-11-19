import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '123456',
  })

  const authenticateResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@example.com',
    password: '123456',
  })

  const createdUser = await prisma.user.findFirst()

  return {
    token: authenticateResponse.body.token,
    id: createdUser?.id,
  }
}
