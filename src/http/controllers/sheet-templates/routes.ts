import { IUserRole } from "@/domain/entities/enums/user-roles"
import { verifyJwt } from "@/http/middlewares/auth/verify-jwt"
import { verifyUserRole } from "@/http/middlewares/auth/verify-user-role"
import type { FastifyInstance } from 'fastify'
import { createSheetTemplate } from './create/create'
import { deleteSheetTemplate } from './delete/delete'
import { getSheetTemplate } from './get/get'
import { listSheetTemplates } from './list/list'
import { updateSheetTemplate } from './update/update'

export async function sheetTemplatesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/', { onRequest: [verifyUserRole([IUserRole.ADMIN])] }, createSheetTemplate)
  app.get('', listSheetTemplates)
  app.get('/:templateId', getSheetTemplate)
  app.delete('/:templateId', { onRequest: [verifyUserRole([IUserRole.ADMIN])] }, deleteSheetTemplate)
  app.put('/:templateId', { onRequest: [verifyUserRole([IUserRole.ADMIN])] }, updateSheetTemplate)
}
