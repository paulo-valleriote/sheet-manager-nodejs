import type { ISheetsRepository } from "@/repositories/sheets-repository";
import type { IUpdateSheetParams } from "@/repositories/@types/sheets";

export class UpdateSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(data: IUpdateSheetParams) {
		await this.sheetsRepository.update(data)
	}
}
