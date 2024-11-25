import type { ISheetTemplatesRepository } from '@/repositories/sheet-templates-repository'

export class ListSheetTemplatesUseCase {
  constructor(private sheetTemplatesRepository: ISheetTemplatesRepository) {}

  async execute() {
    const sheetTemplates = await this.sheetTemplatesRepository.list()
    return sheetTemplates
  }
}
