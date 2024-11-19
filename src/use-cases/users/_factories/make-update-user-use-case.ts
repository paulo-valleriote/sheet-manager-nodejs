import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { UpdateUserUseCase } from "../update/update"

export function makeUpdateUserUseCase() {
  const userRepository = new InMemoryUserRepository()

  return new UpdateUserUseCase(userRepository)
}
