import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { DeleteUserUseCase } from '../delete/delete'

export function makeDeleteUserUseCase() {
  const userRepository = new InMemoryUserRepository()

  return new DeleteUserUseCase(userRepository)
}
