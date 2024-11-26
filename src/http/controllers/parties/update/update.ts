import { makeUpdatePartyUseCase } from '@/use-cases/parties/_factories/make-update-party-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateParty(request: FastifyRequest, reply: FastifyReply) {
  const { dungeonMasterId, partyId, ...data } = parseRequest(request)

  const updatePartyUseCase = makeUpdatePartyUseCase()
  await updatePartyUseCase.execute({
    ...data,
    dungeonMasterId
  }, partyId)

  return reply.status(204).send()
}

function parseRequest(request: FastifyRequest) {
  const updatePartyRequestParamsSchema = z.object({
    dungeonMasterId: z.string().uuid(),
  })

  const updatePartyParamsSchema = z.object({
    partyId: z.string().uuid(),
  })

  const updatePartyBodySchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    imgUrl: z.string().min(1).optional(),
    maxSize: z.number().min(1).optional(),
  })

  const updateReqParams = updatePartyRequestParamsSchema.parse({
    dungeonMasterId: request.user.sub,
  })
  const updateParams = updatePartyParamsSchema.parse(request.params)
  const updateBody = updatePartyBodySchema.parse(request.body)

  return { ...updateReqParams, ...updateParams, ...updateBody }
}
