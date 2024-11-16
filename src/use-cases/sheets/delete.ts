import type { ISheetsRepository } from "@/repositories/sheets-repository";
import type { IDeleteSheetParams } from "@/repositories/@types/sheets";

export class DeleteSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(data: IDeleteSheetParams) {
		await this.sheetsRepository.delete(data)
	}
}
