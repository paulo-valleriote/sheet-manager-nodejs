import { makeListPartyUseCase } from '@/use-cases/parties/_factories/make-list-party-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listParties(request: FastifyRequest, reply: FastifyReply) {
  const { dungeonMasterId } = parseRequest(request)

  const listPartiesUseCase = makeListPartyUseCase()
  const parties = await listPartiesUseCase.execute({ dungeonMasterId })

  return reply.status(200).send({ data: parties.data })
}

function parseRequest(request: FastifyRequest) {
  const listPartyRequestParamsSchema = z.object({
    dungeonMasterId: z.string().uuid(),
  })

  const listReqParams = listPartyRequestParamsSchema.parse({ dungeonMasterId: request.user.sub })

  return listReqParams
}
