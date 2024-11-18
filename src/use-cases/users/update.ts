import type { IUsersRepository } from "@/repositories/users-repository";
import type { IUpdateUserParams } from "@/repositories/@types/users";

export class UpdateUserUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute(data: IUpdateUserParams) {
		const user = await this.userRepository.getById({
			userId: data.userId
		})

		if (!user.data) {
			throw new Error('User not found')
		}

		await this.userRepository.update(data)
	}
}
