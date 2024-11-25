import app from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      email: 'user@example.com',
      password: 'password',
    })

    const authenticateResponse = await request(app.server).post('/sessions').send({
      email: 'user@example.com',
      password: 'password',
    })

    expect(authenticateResponse.statusCode).toBe(200)
    expect(authenticateResponse.body).toEqual({
      token: expect.any(String),
    })
  })
})
