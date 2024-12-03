import type { FastifyReply, FastifyRequest } from 'fastify'

import { ZodError } from 'zod'
import { ENV } from './env'
import { APP_ERRORS } from './use-cases/_errors/index'

export class GlobalErrorHandler {
  async handle(error: Error, request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
    }

    if (error instanceof APP_ERRORS.BadRequestError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof APP_ERRORS.ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof APP_ERRORS.UnauthorizedError) {
      return reply.status(401).send({ message: error.message })
    }

    if (error instanceof APP_ERRORS.ForbiddenError) {
      return reply.status(403).send({ message: error.message })
    }

    if (ENV.NODE_ENV !== 'prod') {
      console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  }
}
