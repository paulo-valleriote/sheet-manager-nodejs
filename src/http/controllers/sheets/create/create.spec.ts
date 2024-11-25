import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Sheet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a sheet', async () => {
    const { token, id: userId } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post(`/users/${userId}/sheets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        pcName: 'Julius',
        pcAge: 35,
        pcRole: 'Warrior',
        pcSpecie: 'Human',
        owner: userId,
      })

    expect(response.statusCode).toBe(201)
  })
})
