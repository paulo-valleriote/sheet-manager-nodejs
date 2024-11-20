import { makeCreateSheetTemplateUseCase } from '@/use-cases/sheets/_factories/sheet-template/make-create-sheet-template-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createSheetTemplate(request: FastifyRequest, reply: FastifyReply) {
  const data = parseRequest(request)

  const createSheetTemplateUseCase = makeCreateSheetTemplateUseCase()
  await createSheetTemplateUseCase.execute(data)

  return reply.status(201).send()
}

function parseRequest(request: FastifyRequest) {
  const createSheetBodySchema = z.object({
    children: z.array(z.any()),
    isDefault: z.boolean().optional(),
  })

  const createBody = createSheetBodySchema.parse(request.body)
  return createBody
}
