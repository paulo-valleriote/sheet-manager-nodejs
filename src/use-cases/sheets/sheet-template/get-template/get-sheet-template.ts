import type { ISheetTemplatesRepository } from '@/repositories/sheet-templates-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface IGetSheetTemplateProps {
  id: string
}

export class GetSheetTemplateUseCase {
  constructor(private sheetTemplatesRepository: ISheetTemplatesRepository) {}

  async execute({ id }: IGetSheetTemplateProps) {
    const sheetTemplate = await this.sheetTemplatesRepository.get({ id })

    if (!sheetTemplate.data) {
      throw new ResourceNotFoundError()
    }

    return sheetTemplate
  }
}
