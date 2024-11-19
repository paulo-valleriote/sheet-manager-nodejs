import { FastifyJwtHandler } from '@/lib/fastify-jwt-handler'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/users/_factories/make-authenticate-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function autheticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()
    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const jwtHandler = new FastifyJwtHandler()
    const { token, refreshToken } = await jwtHandler.sign({
      reply,
      signSub: user.id,
    })

    if (!refreshToken) {
      return reply.status(200).send({ token })
    }

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
