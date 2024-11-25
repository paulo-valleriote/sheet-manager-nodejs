import { randomUUID } from 'node:crypto'
import app from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Sheet Template Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a sheet template', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const templateId = randomUUID()

    await prisma.sheetTemplate.create({
      data: {
        id: templateId,
        children: [],
      },
    })

    const response = await request(app.server)
      .get(`/sheets/templates/${templateId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
  })
})
