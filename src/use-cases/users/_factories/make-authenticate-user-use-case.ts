import { CryptHandler } from '@/lib/crypt-handler'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate/authenticate'

export function makeAuthenticateUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const cryptHandler = new CryptHandler()

  return new AuthenticateUserUseCase(userRepository, cryptHandler)
}
