import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Sheet Template Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a sheet template', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/sheets/templates')
      .set('Authorization', `Bearer ${token}`)
      .send({
        children: [
          {
            type: 'text',
            label: 'Label',
            placeholder: 'Placeholder',
            value: 'Value',
          },
        ],
      })

    expect(response.statusCode).toBe(201)
  })
})
