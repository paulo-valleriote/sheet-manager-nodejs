import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { ICreateSheetParams } from '@/repositories/@types/sheets'

export class CreateSheetUseCase {
  constructor(private sheetsRepository: ISheetsRepository) {}

  async execute(data: ICreateSheetParams) {
    await this.sheetsRepository.create(data)
  }
}
