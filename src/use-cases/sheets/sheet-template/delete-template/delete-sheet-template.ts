import type { ISheetTemplatesRepository } from '@/repositories/sheet-templates-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/core/resource-not-found-error'

interface IDeleteSheetTemplateProps {
  id: string
}

export class DeleteSheetTemplateUseCase {
  constructor(private sheetTemplatesRepository: ISheetTemplatesRepository) {}

  async execute({ id }: IDeleteSheetTemplateProps) {
    const sheetTemplate = await this.sheetTemplatesRepository.get({ id })

    if (!sheetTemplate.data) {
      throw new ResourceNotFoundError()
    }

    await this.sheetTemplatesRepository.delete({ id })
  }
}
