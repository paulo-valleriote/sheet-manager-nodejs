import { verifyJwt } from '@/http/middlewares/auth/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createSheet } from './create'
import { deleteSheet } from './delete'
import { getSheet } from './get'
import { listSheets } from './list'
import { updateSheet } from './update'

export async function sheetsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/sheets', createSheet)
  app.get('/sheets', listSheets)
  app.get('/sheets/:id', getSheet)
  app.delete('/sheets/:id', deleteSheet)
  app.put('/sheets/:id', updateSheet)
}
