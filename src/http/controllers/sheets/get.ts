import { makeGetSheetUseCase } from '@/use-cases/sheets/_factories/make-get-sheet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getSheet(request: FastifyRequest, reply: FastifyReply) {
  const { sheetId, userId } = parseRequest(request)

  const getSheetUseCase = makeGetSheetUseCase()
  const sheet = await getSheetUseCase.execute({ sheetId, userId })

  return reply.status(200).send({ data: sheet })
}

function parseRequest(request: FastifyRequest) {
  const getSheetParamsSchema = z.object({
    sheetId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  return getSheetParamsSchema.parse(request.params)
}
