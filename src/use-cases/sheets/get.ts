import type { ISheetsRepository } from "@/repositories/sheets-repository";
import type { IGetSheetParams } from "@/repositories/@types/sheets";

export class GetSheetUseCase {
	constructor(private sheetsRepository: ISheetsRepository) {}

	async execute(data: IGetSheetParams) {
		return await this.sheetsRepository.get(data)
	}
}
