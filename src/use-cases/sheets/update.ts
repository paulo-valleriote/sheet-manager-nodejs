import type { ISheetsRepository } from "@/repositories/sheets-repository";
import type { IUpdateSheetParams } from "@/repositories/@types/sheets";

export class UpdateSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(data: IUpdateSheetParams) {
		const sheet = await this.sheetsRepository.get({
			sheetId: data.sheetId,
			userId: data.userId
		})

		if (!sheet.data) {
			throw new Error('Sheet not found')
		}

		await this.sheetsRepository.update(data)
	}
}
