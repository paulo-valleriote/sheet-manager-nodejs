import app from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const registerResponse = await request(app.server).post('/users').send({
      email: 'user@example.com',
      password: 'password',
    })

    expect(registerResponse.statusCode).toBe(201)

    if (prisma !== null) {
      const user = await prisma.user.findUnique({
        where: {
          email: 'user@example.com',
        },
      })

      expect(user).not.toBeNull()
      expect(user?.email).toBe('user@example.com')
      expect(user?.passwordHash).not.toBe('password')
    }
  })
})
