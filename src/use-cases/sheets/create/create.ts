import type { ICreateSheetParams } from '@/repositories/@types/sheets'
import type { ISheetsRepository } from '@/repositories/sheets-repository'

export class CreateSheetUseCase {
  constructor(private sheetsRepository: ISheetsRepository) {}

  async execute(data: ICreateSheetParams) {
    await this.sheetsRepository.create(data)
  }
}
