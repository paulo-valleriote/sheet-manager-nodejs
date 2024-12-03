import { CryptHandler } from '@/lib/hashing/crypt-handler'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../create/create'

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const cryptHandler = new CryptHandler()

  return new CreateUserUseCase(userRepository, cryptHandler)
}
