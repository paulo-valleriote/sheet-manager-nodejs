import { makeDeleteSheetUseCase } from '@/use-cases/sheets/_factories/make-delete-sheet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteSheet(request: FastifyRequest, reply: FastifyReply) {
  const { sheetId, userId } = parseRequest(request)

  const deleteSheetUseCase = makeDeleteSheetUseCase()
  await deleteSheetUseCase.execute({ sheetId, userId })

  return reply.status(204).send()
}

function parseRequest(request: FastifyRequest) {
  const deleteSheetParamsSchema = z.object({
    sheetId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  return deleteSheetParamsSchema.parse(request.params)
}
