import { randomUUID } from 'node:crypto'
import app from '@/app'
import { IUserRole } from '@/domain/entities/enums/user-roles'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Sheet Template Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a sheet template', async () => {
    const { token } = await createAndAuthenticateUser(app, IUserRole.ADMIN)
    const templateId = randomUUID()

    await prisma.sheetTemplate.create({
      data: {
        id: templateId,
        children: [
          {
            type: 'text',
            label: 'Label',
            placeholder: 'Placeholder',
            value: 'Value',
          },
        ],
      },
    })

    const response = await request(app.server)
      .put(`/sheets/templates/${templateId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        children: [
          {
            type: 'text',
            label: 'Label 2',
            placeholder: 'Placeholder 2',
            value: 'Value 2',
          },
        ],
      })

    const sheetTemplate = await prisma.sheetTemplate.findUnique({
      where: { id: templateId },
    })
    const templateChildren = JSON.parse(sheetTemplate?.children?.toString() ?? '')

    expect(response.statusCode).toBe(204)
    expect(templateChildren).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'text',
          label: 'Label 2',
          placeholder: 'Placeholder 2',
          value: 'Value 2',
        }),
      ]),
    )
  })
})
