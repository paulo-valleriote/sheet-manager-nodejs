import { randomUUID } from 'node:crypto'
import app from '@/app'
import { IUserRole } from '@/domain/entities/enums/user-roles'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete Sheet Template Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a sheet template', async () => {
    const { token } = await createAndAuthenticateUser(app, IUserRole.ADMIN)
    const templateId = randomUUID()

    await prisma.sheetTemplate.create({
      data: {
        id: templateId,
        children: [],
      },
    })

    const response = await request(app.server)
      .delete(`/sheets/templates/${templateId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(204)
  })
})
