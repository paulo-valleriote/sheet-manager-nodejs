import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../get/get'

export function makeGetUserUseCase() {
  const userRepository = new PrismaUsersRepository()

  return new GetUserUseCase(userRepository)
}
