import type { IUser } from "@/domain/entities/User";
import type { ICryptHandler } from "@/lib/@types/crypt";
import type { IUsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";

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
    private cryptHandler: ICryptHandler
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
      user: userWithoutPasswordHash
    }
  }
}
