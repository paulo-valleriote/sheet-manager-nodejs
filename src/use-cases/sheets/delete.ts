import type { ISheetsRepository } from "@/repositories/sheets-repository";

export class DeleteSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(sheetId: string) {
		await this.sheetsRepository.delete(sheetId)
	}
}
