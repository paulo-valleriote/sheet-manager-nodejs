import type { ICryptHandler } from '@/lib/@types/crypt'
import type { IUsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../../_errors/core/resource-not-found-error'
import { InvalidCredentialsError } from '../../_errors/extended/user/invalid-credentials-error'

interface RecoverPasswordUseCaseRequest {
  email: string
  oldPassword: string
  newPassword: string
}

export class RecoverPasswordUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private cryptHandler: ICryptHandler,
  ) {}

  async execute(data: RecoverPasswordUseCaseRequest): Promise<void> {
    const user = await this.userRepository.getByEmail({ email: data.email })

    if (!user.data) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatch = await this.cryptHandler.compare(data.oldPassword, user.data.passwordHash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    const passwordHash = await this.cryptHandler.hash(data.newPassword)
    await this.userRepository.update({
      userId: user.data.id,
      passwordHash,
    })
  }
}
