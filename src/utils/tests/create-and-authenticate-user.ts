import { IUserRole } from '@/domain/entities/enums/user-roles'
import { CryptHandler } from '@/lib/crypt-handler'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateUser = async (app: FastifyInstance, role?: IUserRole) => {
  await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      passwordHash: await new CryptHandler().hash('123456'),
      role: role ?? IUserRole.USER,
    },
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
