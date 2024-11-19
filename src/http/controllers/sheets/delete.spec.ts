import { randomUUID } from 'node:crypto'
import app from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete Sheet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a sheet', async () => {
    const { token, id: userId } = await createAndAuthenticateUser(app)
    const sheetId = randomUUID()

    await prisma.sheet.create({
      data: {
        id: sheetId,
        name: 'Sheet 1',
        userId: userId || 'user-1',
      },
    })

    const response = await request(app.server)
      .delete(`/users/${userId}/sheets/${sheetId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(204)
  })
})
