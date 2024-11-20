import { makeListSheetTemplateUseCase } from '@/use-cases/sheets/_factories/sheet-template/make-list-sheet-template-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listSheetTemplates(request: FastifyRequest, reply: FastifyReply) {
  const listSheetTemplatesUseCase = makeListSheetTemplateUseCase()
  const sheetTemplates = await listSheetTemplatesUseCase.execute()

  return reply.status(200).send({ data: sheetTemplates.data })
}
