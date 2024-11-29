import { makeCreatePartyUseCase } from '@/use-cases/parties/_factories/make-create-party-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createParty(request: FastifyRequest, reply: FastifyReply) {
  const data = parseRequest(request)
  console.log('data', data)
  const createPartyUseCase = makeCreatePartyUseCase()

  await createPartyUseCase.execute(data)
  return reply.status(201).send()
}

function parseRequest(request: FastifyRequest) {
  const createPartyParamsSchema = z.object({
    dungeonMasterId: z.string().uuid(),
  })

  const createPartyBodySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    imgUrl: z.string().min(1),
    maxSize: z.number().min(1),
    sheetId: z.string().uuid().optional(),
  })

  const createParams = createPartyParamsSchema.parse({ dungeonMasterId: request.user.sub })
  const createBody = createPartyBodySchema.parse(request.body)

  return { ...createParams, ...createBody }
}
