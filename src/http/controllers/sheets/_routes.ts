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
  app.get('/sheets/:sheetId', getSheet)
  app.delete('/sheets/:sheetId', deleteSheet)
  app.put('/sheets/:sheetId', updateSheet)
}
