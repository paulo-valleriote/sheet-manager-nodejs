import { IUserRole } from '@/domain/entities/enums/user-roles'
import type { ICryptHandler } from '@/lib/@types/crypt'
import type { IUsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'

interface ICreateUserUseCaseParams {
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private cryptHandler: ICryptHandler,
  ) {}

  async execute(data: ICreateUserUseCaseParams) {
    const userWithSameEmail = await this.userRepository.getByEmail({ email: data.email })

    if (userWithSameEmail.data) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await this.cryptHandler.hash(data.password)

    await this.userRepository.create({
      email: data.email,
      passwordHash,
      role: IUserRole.USER,
    })
  }
}
