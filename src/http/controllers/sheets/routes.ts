import { verifyJwt } from '@/http/middlewares/auth/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createSheet } from './create/create'
import { deleteSheet } from './delete/delete'
import { getSheet } from './get/get'
import { listSheets } from './list/list'
import { updateSheet } from './update/update'

export async function sheetsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/', createSheet)
  app.get('', listSheets)
  app.get('/:sheetId', getSheet)
  app.delete('/:sheetId', deleteSheet)
  app.put('/:sheetId', updateSheet)
}
