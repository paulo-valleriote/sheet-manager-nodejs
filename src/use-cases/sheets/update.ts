import type { ISheetsRepository } from "@/repositories/sheets-repository";

export class UpdateSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(sheetId: string, data: any) {
		await this.sheetsRepository.update(sheetId, data)
	}
}
