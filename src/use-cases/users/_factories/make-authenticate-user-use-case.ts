import { CryptHandler } from '@/lib/crypt-handler'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUserUseCase } from '../authenticate/authenticate'

export function makeAuthenticateUserUseCase() {
  const userRepository = new InMemoryUserRepository()
  const cryptHandler = new CryptHandler()
  return new AuthenticateUserUseCase(userRepository, cryptHandler)
}
