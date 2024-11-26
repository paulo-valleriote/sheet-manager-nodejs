import { randomUUID } from 'node:crypto'
import app from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Party Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a party', async () => {
    const { token, id: userId } = await createAndAuthenticateUser(app)
    const partyId = randomUUID()

    await prisma.party.create({
      data: {
        id: partyId,
        name: 'Party name',
        description: 'Party description',
        imgUrl: 'https://example.com/image.png',
        maxSize: 10,
        dungeonMasterId: userId || 'user-1',
      },
    })

    const response = await request(app.server)
      .put(`/parties/${partyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Party name 2',
      })

    console.log(response.body)
    expect(response.statusCode).toBe(204)
  })
})
