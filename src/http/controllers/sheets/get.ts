import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetSheetController {
  constructor(private readonly sheetsRepository: ISheetsRepository) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sheetId, userId } = this.parseRequest(request)

    const sheet = await this.sheetsRepository.get({ sheetId, userId })
    return reply.status(200).send({ data: sheet })
  }

  private parseRequest(request: FastifyRequest) {
    const getSheetParamsSchema = z.object({
      sheetId: z.string().uuid(),
      userId: z.string().uuid()
    })

    return getSheetParamsSchema.parse(request.params)
  }
}
