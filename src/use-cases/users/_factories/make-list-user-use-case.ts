import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ListUserUseCase } from '../list/list'

export function makeListUserUseCase() {
  const userRepository = new InMemoryUserRepository()

  return new ListUserUseCase(userRepository)
}
