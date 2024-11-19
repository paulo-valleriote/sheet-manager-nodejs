import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUserUseCase } from '../list/list'

export function makeListUserUseCase() {
  const userRepository = new PrismaUsersRepository()

  return new ListUserUseCase(userRepository)
}
