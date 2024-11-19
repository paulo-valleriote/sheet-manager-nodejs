import type { FastifyInstance } from 'fastify'
import request from 'supertest'
import { verifyJwt } from '@/http/middlewares/auth/verify-jwt';

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server)
    .post('/users')
    .send({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '123456'
  })

  const authenticateResponse = await request(app.server)
  .post('/sessions')
  .send({
    email: 'john.doe@example.com',
      password: '123456',
    })

  return {
    token: authenticateResponse.body.token,
  }
};
