import { CryptHandler } from '@/lib/crypt-handler'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from '../create/create'

export function makeCreateUserUseCase() {
  const userRepository = new InMemoryUserRepository()
  const cryptHandler = new CryptHandler()

  return new CreateUserUseCase(userRepository, cryptHandler)
}
