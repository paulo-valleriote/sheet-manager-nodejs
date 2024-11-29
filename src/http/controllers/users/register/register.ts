import { UserAlreadyExistsError } from '@/use-cases/_errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/users/_factories/make-create-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()
    await createUserUseCase.execute(data)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
