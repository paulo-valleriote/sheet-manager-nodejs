import { verifyJwt } from "@/http/middlewares/auth/verify-jwt"
import type { FastifyInstance } from 'fastify'
import { createSheetTemplate } from './create/create'
import { deleteSheetTemplate } from './delete/delete'
import { getSheetTemplate } from './get/get'
import { listSheetTemplates } from './list/list'
import { updateSheetTemplate } from './update/update'

export async function sheetTemplatesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/', createSheetTemplate)
  app.get('', listSheetTemplates)
  app.get('/:templateId', getSheetTemplate)
  app.delete('/:templateId', deleteSheetTemplate)
  app.put('/:templateId', updateSheetTemplate)
}
