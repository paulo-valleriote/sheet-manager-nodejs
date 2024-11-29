import type { IUpdateUserParams } from '@/repositories/@types/users'
import type { IUsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../../_errors/resource-not-found-error'

export class UpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IUpdateUserParams) {
    const user = await this.userRepository.getById({
      userId: data.userId,
    })

    if (!user.data) {
      throw new ResourceNotFoundError()
    }

    await this.userRepository.update(data)
  }
}
