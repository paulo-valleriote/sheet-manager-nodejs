import { makeUpdateSheetUseCase } from '@/use-cases/sheets/_factories/make-update-sheet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateSheet(request: FastifyRequest, reply: FastifyReply) {
  const {sheetId, ...data} = parseRequest(request)

  const updateSheetUseCase = makeUpdateSheetUseCase()
  await updateSheetUseCase.execute(data, sheetId)

  return reply.status(204).send()
}

function parseRequest(request: FastifyRequest) {
  const updateSheetParamsSchema = z.object({
    sheetId: z.string().uuid(),
    userId: z.string().uuid(),
  })

  const updateSheetBodySchema = z.object({
    pcName: z.string().min(1).optional(),
    pcAge: z.number().min(1).optional(),
    pcRole: z.string().min(1).optional(),
    pcSpecie: z.string().min(1).optional(),
  })

  const updateParams = updateSheetParamsSchema.parse(request.params)
  const updateBody = updateSheetBodySchema.parse(request.body)

  return { ...updateParams, ...updateBody }
}
