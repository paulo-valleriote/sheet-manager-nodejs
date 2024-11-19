import type { IUsersRepository } from '@/repositories/users-repository'
import type { IDeleteUserParams } from '@/repositories/@types/users'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

export class DeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IDeleteUserParams) {
    const user = await this.userRepository.getById(data)

    if (!user.data) {
      throw new ResourceNotFoundError()
    }

    await this.userRepository.delete(data)
  }
}
