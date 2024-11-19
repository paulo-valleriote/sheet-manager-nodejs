import app from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh', async () => {
    await request(app.server).post('/users').send({
      email: 'user@example.com',
      password: 'password',
    })

    const authenticateResponse = await request(app.server).post('/sessions').send({
      email: 'user@example.com',
      password: 'password',
    })

    const generatedCookies = authenticateResponse.get('Set-Cookie')
    if (!generatedCookies) throw new Error('Cookies not found')

    const refreshResponse = await request(app.server).patch('/token/refresh').set('Cookie', generatedCookies).send()

    expect(refreshResponse.statusCode).toBe(200)
    expect(refreshResponse.body).toEqual({
      token: expect.any(String),
    })
    expect(refreshResponse.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')])
  })
})
