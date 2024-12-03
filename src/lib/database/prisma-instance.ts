import { ENV } from '@/env'
import { PrismaClient } from '@prisma/client'

/**
 * Prisma client instance
 * @description Constant that contains the Prisma client instance to interact with ORM
 */
export const prisma = new PrismaClient({
  log: ENV.NODE_ENV === 'dev' ? ['query', 'error'] : [],
})
