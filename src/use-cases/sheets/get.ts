import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { IGetSheetParams } from '@/repositories/@types/sheets'

export class GetSheetUseCase {
  constructor(private sheetsRepository: ISheetsRepository) {}

  async execute(data: IGetSheetParams) {
    const sheet = await this.sheetsRepository.get(data)

    if (!sheet.data) {
      throw new Error('Sheet not found')
    }

    return sheet
  }
}
