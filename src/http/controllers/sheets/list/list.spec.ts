import { randomUUID } from 'node:crypto'
import app from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List Sheets Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list sheets', async () => {
    const { token, id: userId } = await createAndAuthenticateUser(app)
    const sheetId = randomUUID()

    await prisma.sheet.createMany({
      data: [
        {
          id: sheetId,
          pcName: 'Julius',
          pcAge: 35,
          pcRole: 'Warrior',
          pcSpecie: 'Human',
          owner: userId || 'user-1',
          userId: userId || 'user-1',
        },
        {
          id: randomUUID(),
          pcName: 'John',
          pcAge: 25,
          pcRole: 'Mage',
          pcSpecie: 'Elf',
          owner: userId || 'user-1',
          userId: userId || 'user-1',
        },
      ],
    })

    const response = await request(app.server).get(`/users/${userId}/sheets`).set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: sheetId,
          pcName: 'Julius',
          pcAge: 35,
          pcRole: 'Warrior',
          pcSpecie: 'Human',
        }),
        expect.objectContaining({
          id: expect.any(String),
          pcName: 'John',
          pcAge: 25,
          pcRole: 'Mage',
          pcSpecie: 'Elf',
        }),
      ]),
    )
  })
})
