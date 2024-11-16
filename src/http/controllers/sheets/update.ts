import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class UpdateSheetController {
  constructor(private readonly sheetsRepository: ISheetsRepository) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sheetId, userId, name } = this.parseRequest(request)

    const sheet = await this.sheetsRepository.update({ 
      userId,
      sheetId,
      name
    })
    
    return reply.status(200).send(sheet)
  }

  private parseRequest(request: FastifyRequest) {
    const updateSheetParamsSchema = z.object({
      sheetId: z.string().uuid(),
      userId: z.string().uuid(),
    })

    const updateSheetBodySchema = z.object({
      name: z.string().min(1)
    })

    const updateParams = updateSheetParamsSchema.parse(request.params)
    const updateBody = updateSheetBodySchema.parse(request.body)

    return { ...updateParams, ...updateBody }
  }
}
