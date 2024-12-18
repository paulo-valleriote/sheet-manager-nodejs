import type { IDeleteSheetParams } from '@/repositories/@types/sheets'
import type { ISheetsRepository } from '@/repositories/sheets-repository'

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
