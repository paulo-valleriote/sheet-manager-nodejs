import { CryptHandler } from '@/lib/hashing/crypt-handler'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RecoverPasswordUseCase } from '../recover-password/recover-password'

export function makeRecoverPasswordUseCase() {
  const userRepository = new PrismaUsersRepository()
  const cryptHandler = new CryptHandler()

  return new RecoverPasswordUseCase(userRepository, cryptHandler)
}
