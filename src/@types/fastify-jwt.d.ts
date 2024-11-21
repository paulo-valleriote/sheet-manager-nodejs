import type { IUserRole } from '@/domain/entities/enums/user-roles'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: IUserRole
    }
  }
}
