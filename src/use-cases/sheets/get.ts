import type { ISheetsRepository } from "@/repositories/sheets-repository";

export class GetSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(sheetId: string) {
		return await this.sheetsRepository.get(sheetId)
	}
}
