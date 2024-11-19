import type { ISheetsRepository } from '@/repositories/sheets-repository'
import type { IDeleteSheetParams } from '@/repositories/@types/sheets'

export class DeleteSheetUseCase {
  constructor(private sheetsRepository: ISheetsRepository) {}

  async execute(data: IDeleteSheetParams) {
    const sheet = await this.sheetsRepository.get(data)

    if (!sheet.data) {
      throw new Error('Sheet not found')
    }

    await this.sheetsRepository.delete(data)
  }
}
