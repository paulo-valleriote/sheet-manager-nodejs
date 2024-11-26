import type { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Verify JWT middleware
 * @description This middleware is responsible to authorize requests that have a valid JWT token
 */
export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
