import { makeGetPartyUseCase } from '@/use-cases/parties/_factories/make-get-party-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getParty(request: FastifyRequest, reply: FastifyReply) {
  const { partyId } = parseRequest(request)

  const getPartyUseCase = makeGetPartyUseCase()
  const party = await getPartyUseCase.execute({ partyId })

  return reply.status(200).send({ data: party.data })
}

function parseRequest(request: FastifyRequest) {
  const getPartyParamsSchema = z.object({
    partyId: z.string().uuid(),
  })

  const getParams = getPartyParamsSchema.parse(request.params)

  return getParams
}
