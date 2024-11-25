import { makeGetSheetTemplateUseCase } from '@/use-cases/sheets/_factories/sheet-template/make-get-sheet-template-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getSheetTemplate(request: FastifyRequest, reply: FastifyReply) {
  const { templateId } = parseRequest(request)

  const getSheetTemplateUseCase = makeGetSheetTemplateUseCase()
  const sheetTemplate = await getSheetTemplateUseCase.execute({ id: templateId })

  return reply.status(200).send({ data: sheetTemplate.data })
}

function parseRequest(request: FastifyRequest) {
  const getSheetTemplateParamsSchema = z.object({
    templateId: z.string().uuid(),
  })

  return getSheetTemplateParamsSchema.parse(request.params)
}
