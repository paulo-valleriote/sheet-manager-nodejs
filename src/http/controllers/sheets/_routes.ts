import type { FastifyInstance } from 'fastify'
import { createSheet } from './create'
import { listSheets } from './list'
import { getSheet } from './get'
import { deleteSheet } from './delete'
import { updateSheet } from './update'
import { verifyJwt } from '@/http/middlewares/auth/verify-jwt'

export async function sheetsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/sheets', createSheet)
  app.get('/sheets', listSheets)
  app.get('/sheets/:id', getSheet)
  app.delete('/sheets/:id', deleteSheet)
  app.put('/sheets/:id', updateSheet)
}
