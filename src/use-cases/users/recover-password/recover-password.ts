import type { ICryptHandler } from '@/lib/@types/crypt'
import type { IUsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../../_errors/invalid-credentials-error'
import { ResourceNotFoundError } from '../../_errors/resource-not-found-error'

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
