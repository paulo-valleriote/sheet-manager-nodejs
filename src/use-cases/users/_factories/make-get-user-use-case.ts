import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { GetUserUseCase } from '../get/get'

export function makeGetUserUseCase() {
  const userRepository = new InMemoryUserRepository()

  return new GetUserUseCase(userRepository)
}
