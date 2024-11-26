import { makeDeletePartyUseCase } from '@/use-cases/parties/_factories/make-delete-party-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteParty(request: FastifyRequest, reply: FastifyReply) {
  const { partyId, dungeonMasterId } = parseRequest(request)

  const deletePartyUseCase = makeDeletePartyUseCase()
  await deletePartyUseCase.execute({ partyId, dungeonMasterId })

  return reply.status(204).send()
}

function parseRequest(request: FastifyRequest) {
  const deletePartyRequestParamsSchema = z.object({
    dungeonMasterId: z.string().uuid(),
  })

  const deletePartyParamsSchema = z.object({
    partyId: z.string().uuid(),
  })

  const deleteReqParams = deletePartyRequestParamsSchema.parse({
    dungeonMasterId: request.user.sub,
  })
  const deleteParams = deletePartyParamsSchema.parse(request.params)

  return { ...deleteReqParams, ...deleteParams }
}
