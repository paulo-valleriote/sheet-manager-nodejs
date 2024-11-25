import type { IUserRole } from '@/domain/entities/enums/user-roles'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(rolesToVerify: IUserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!rolesToVerify.includes(role)) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
