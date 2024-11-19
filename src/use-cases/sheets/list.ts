import type { IListSheetsParams } from '@/repositories/@types/sheets'
import type { ISheetsRepository } from '@/repositories/sheets-repository'

export class ListSheetUseCase {
  constructor(private sheetsRepository: ISheetsRepository) {}

  async execute(data: IListSheetsParams) {
    return await this.sheetsRepository.list(data)
  }
}
