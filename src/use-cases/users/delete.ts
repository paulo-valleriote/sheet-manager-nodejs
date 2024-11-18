import type { IUsersRepository } from "@/repositories/users-repository";
import type { IDeleteUserParams } from "@/repositories/@types/users";

export class DeleteUserUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute(data: IDeleteUserParams) {
		const user = await this.userRepository.getById(data)

		if (!user.data) {
			throw new Error('User not found')
		}

		await this.userRepository.delete(data)
	}
}
