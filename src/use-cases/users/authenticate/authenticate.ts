import type { IUser } from '@/domain/entities/user'
import type { ICryptHandler } from '@/lib/@types/crypt'
import type { IUsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../../_errors/invalid-credentials-error'
import { ResourceNotFoundError } from '../../_errors/resource-not-found-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: Omit<IUser, 'passwordHash'>
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private cryptHandler: ICryptHandler,
  ) {}

  async execute(data: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.getByEmail({ email: data.email })

    if (!user.data) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatch = await this.cryptHandler.compare(data.password, user.data.passwordHash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    const { passwordHash, ...userWithoutPasswordHash } = user.data
    return {
      user: userWithoutPasswordHash,
    }
  }
}
