import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteSheetController {
  constructor(private readonly sheetsRepository: ISheetsRepository) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sheetId, userId } = this.parseRequest(request)

    await this.sheetsRepository.delete({ sheetId, userId })
    return reply.status(204).send()
  }

  private parseRequest(request: FastifyRequest) {
    const deleteSheetParamsSchema = z.object({
      sheetId: z.string().uuid(),
      userId: z.string().uuid()
    })

    return deleteSheetParamsSchema.parse(request.params)
  }
}
