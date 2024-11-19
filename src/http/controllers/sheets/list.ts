import { makeListSheetUseCase } from '@/use-cases/sheets/_factories/make-list-sheet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listSheets(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = parseRequest(request)

  const listSheetsUseCase = makeListSheetUseCase()
  const sheets = await listSheetsUseCase.execute({ userId })

  return reply.status(200).send({ data: sheets })
}

function parseRequest(request: FastifyRequest) {
  const listSheetsParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  return listSheetsParamsSchema.parse(request.params)
}
