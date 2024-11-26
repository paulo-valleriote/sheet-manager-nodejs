import { makeGetPartyUseCase } from '@/use-cases/parties/_factories/make-get-party-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getParty(request: FastifyRequest, reply: FastifyReply) {
  const { partyId, dungeonMasterId } = parseRequest(request)

  const getPartyUseCase = makeGetPartyUseCase()
  const party = await getPartyUseCase.execute({ partyId, dungeonMasterId })

  return reply.status(200).send({ data: party })
}

function parseRequest(request: FastifyRequest) {
  const getPartyRequestParamsSchema = z.object({
    dungeonMasterId: z.string().uuid(),
  })

  const getPartyParamsSchema = z.object({
    partyId: z.string().uuid(),
  })

  const getReqParams = getPartyRequestParamsSchema.parse({
    dungeonMasterId: request.user.sub,
  })
  const getParams = getPartyParamsSchema.parse(request.params)

  return { ...getReqParams, ...getParams }
}
