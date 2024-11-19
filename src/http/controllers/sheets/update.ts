import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateSheetUseCase } from '@/use-cases/sheets/_factories/make-update-sheet-use-case'

export async function updateSheet(request: FastifyRequest, reply: FastifyReply) {
  const { sheetId, userId, name } = parseRequest(request)

  const updateSheetUseCase = makeUpdateSheetUseCase()
  const sheet = await updateSheetUseCase.execute({
    userId,
    sheetId,
    name,
  })

  return reply.status(200).send(sheet)
}

function parseRequest(request: FastifyRequest) {
  const updateSheetParamsSchema = z.object({
    sheetId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  const updateSheetBodySchema = z.object({
    name: z.string().min(1),
  })

  const updateParams = updateSheetParamsSchema.parse(request.params)
  const updateBody = updateSheetBodySchema.parse(request.body)

  return { ...updateParams, ...updateBody }
}
