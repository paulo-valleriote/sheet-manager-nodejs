import { makeDeleteSheetTemplateUseCase } from '@/use-cases/sheets/_factories/sheet-template/make-delete-sheet-template-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteSheetTemplate(request: FastifyRequest, reply: FastifyReply) {
  const { templateId } = parseRequest(request)

  const deleteSheetTemplateUseCase = makeDeleteSheetTemplateUseCase()
  await deleteSheetTemplateUseCase.execute({ id: templateId })

  return reply.status(204).send()
}

function parseRequest(request: FastifyRequest) {
  const deleteSheetParamsSchema = z.object({
    templateId: z.string().uuid(),
  })

  return deleteSheetParamsSchema.parse(request.params)
}
