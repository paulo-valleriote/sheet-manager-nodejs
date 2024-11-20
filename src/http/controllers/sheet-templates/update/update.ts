import { makeUpdateSheetTemplateUseCase } from '@/use-cases/sheets/_factories/sheet-template/make-update-sheet-template-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateSheetTemplate(request: FastifyRequest, reply: FastifyReply) {
  const data = parseRequest(request)

  const updateSheetTemplateUseCase = makeUpdateSheetTemplateUseCase()

  await updateSheetTemplateUseCase.execute({
    id: data.templateId,
    ...data,
  })

  return reply.status(204).send()
}

function parseRequest(request: FastifyRequest) {
  const updateSheetParamsSchema = z.object({
    templateId: z.string().uuid(),
  })

  const updateSheetBodySchema = z.object({
    children: z.array(z.any()),
    isDefault: z.boolean().optional(),
  })

  const updateParams = updateSheetParamsSchema.parse(request.params)
  const updateBody = updateSheetBodySchema.parse(request.body)

  return { ...updateParams, ...updateBody }
}
