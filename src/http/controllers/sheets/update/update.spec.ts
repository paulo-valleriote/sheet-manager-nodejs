import { randomUUID } from 'node:crypto'
import app from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Sheet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a sheet', async () => {
    const { token, id: userId } = await createAndAuthenticateUser(app)
    const sheetId = randomUUID()

    await prisma.sheet.create({
      data: {
        id: sheetId,
        pcName: 'Julius',
        pcAge: 35,
        pcRole: 'Warrior',
        pcSpecie: 'Human',
        owner: userId || 'user-1',
        userId: userId || 'user-1',
      },
    })

    const response = await request(app.server)
      .put(`/users/${userId}/sheets/${sheetId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sheet 2',
      })

    expect(response.statusCode).toBe(204)
  })
})
