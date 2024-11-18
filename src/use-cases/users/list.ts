import type { IUsersRepository } from "@/repositories/users-repository";

export class ListUserUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute() {
		return await this.userRepository.list()
	}
}
