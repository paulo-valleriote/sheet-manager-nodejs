import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Party Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a party', async () => {
    const { token, id: userId } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/parties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Party name',
        description: 'Party description',
        imgUrl: 'https://example.com/image.png',
        maxSize: 10,
      })

    expect(response.statusCode).toBe(201)
  })
})
