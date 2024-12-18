import type { IGetUserParams } from '@/repositories/@types/users'
import type { IUsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../../_errors/core/resource-not-found-error'

export class GetUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IGetUserParams) {
    const user = await this.userRepository.getById(data)

    if (!user.data) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
