import type { ISheetsRepository } from "@/repositories/sheets-repository";

export class ListSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(userId: string) {
		return await this.sheetsRepository.list(userId)
	}
}
