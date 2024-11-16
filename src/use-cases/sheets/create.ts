import type { ISheetsRepository } from "@/repositories/sheets-repository";

export class CreateSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(data: any) {
		await this.sheetsRepository.create(data)
	}
}
