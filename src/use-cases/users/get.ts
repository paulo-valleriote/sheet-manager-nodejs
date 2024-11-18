import type { IUsersRepository } from "@/repositories/users-repository";
import type { IGetUserParams } from "@/repositories/@types/users";

export class GetUserUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute(data: IGetUserParams) {
		const user = await this.userRepository.getById(data)

    if (!user.data) {
      throw new Error('User not found')
    }

    return user
	}
}
