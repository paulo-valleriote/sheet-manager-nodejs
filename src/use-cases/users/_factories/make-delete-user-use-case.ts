import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete/delete'

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUsersRepository()

  return new DeleteUserUseCase(userRepository)
}
