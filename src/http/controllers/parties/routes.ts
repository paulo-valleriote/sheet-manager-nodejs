import { verifyJwt } from '@/http/middlewares/auth/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createParty } from './create/create'
import { deleteParty } from './delete/delete'
import { getParty } from './get/get'
import { listParties } from './list/list'
import { updateParty } from './update/update'

export async function partiesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/', createParty)
  app.get('', listParties)
  app.get('/:partyId', getParty)
  app.delete('/:partyId', deleteParty)
  app.put('/:partyId', updateParty)
}
