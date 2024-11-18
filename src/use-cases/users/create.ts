import type { IUsersRepository } from "@/repositories/users-repository";

interface ICreateUserUseCaseParams {
	email: string
	password: string
}

export class CreateUserUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute(data: ICreateUserUseCaseParams) {
		const passwordHash = ''

		await this.userRepository.create({
			email: data.email,
			passwordHash
		})
	}
}
