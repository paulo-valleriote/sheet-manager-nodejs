import { makeCreateSheetUseCase } from '@/use-cases/sheets/_factories/make-create-sheet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createSheet(request: FastifyRequest, reply: FastifyReply) {
  const data = parseRequest(request)

  const createSheetUseCase = makeCreateSheetUseCase()
  await createSheetUseCase.execute(data)

  return reply.status(201).send()
}

function parseRequest(request: FastifyRequest) {
  const createSheetParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const createSheetBodySchema = z.object({
    pcName: z.string().min(1),
    pcAge: z.number().min(1),
    pcRole: z.string().min(1),
    pcSpecie: z.string().min(1),
    owner: z.string().min(1),
  })

  const createParams = createSheetParamsSchema.parse(request.params)
  const createBody = createSheetBodySchema.parse(request.body)

  return { ...createParams, ...createBody }
}
