import { CryptHandler } from '@/lib/crypt-handler'
import { CreateUserUseCase } from '../create/create'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'

export function makeCreateUserUseCase() {
  const userRepository = new InMemoryUserRepository()
  const cryptHandler = new CryptHandler()

  return new CreateUserUseCase(userRepository, cryptHandler)
}
