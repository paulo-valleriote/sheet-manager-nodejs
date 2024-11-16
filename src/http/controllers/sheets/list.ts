import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ListSheetsController {
  constructor(private readonly sheetsRepository: ISheetsRepository) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = this.parseRequest(request)

    const sheets = await this.sheetsRepository.list({ userId })
    return reply.status(200).send({ data: sheets })
  }

  private parseRequest(request: FastifyRequest) {
    const listSheetsParamsSchema = z.object({
      userId: z.string().uuid()
    })

    return listSheetsParamsSchema.parse(request.params)
  }
}
