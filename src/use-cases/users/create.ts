import type { ICryptHandler } from '@/lib/@types/crypt'
import type { IUsersRepository } from '@/repositories/users-repository'

interface ICreateUserUseCaseParams {
	email: string
	password: string
}

export class CreateUserUseCase {
	constructor(
		private userRepository: IUsersRepository,
		private cryptHandler: ICryptHandler
	) {}

	async execute(data: ICreateUserUseCaseParams) {
		const passwordHash = await this.cryptHandler.hash(data.password)

		await this.userRepository.create({
			email: data.email,
			passwordHash
		})
	}
}
