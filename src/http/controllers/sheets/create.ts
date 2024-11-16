import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateSheetController {
  constructor(private readonly sheetsRepository: ISheetsRepository) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, userId } = this.parseRequest(request)

    const sheet = await this.sheetsRepository.create({ name, userId })
    return reply.status(200).send(sheet)
  }

  private parseRequest(request: FastifyRequest) {
    const createSheetParamsSchema = z.object({
      userId: z.string().uuid()
    })

    const createSheetBodySchema = z.object({
      name: z.string().min(1)
    })

    const createParams = createSheetParamsSchema.parse(request.params)
    const createBody = createSheetBodySchema.parse(request.body)

    return { ...createParams, ...createBody }
  }
}
