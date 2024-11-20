import type { IModuleComponent } from '@/domain/entities/module-content'
import type { ISheetTemplatesRepository } from '@/repositories/sheet-templates-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { verifyAndParseComponents } from '@/utils/sheet-modules/parse-and-validate-module-components'

interface IUpdateSheetTemplateProps {
  id: string
  children: IModuleComponent[]
  isDefault?: boolean
}

export class UpdateSheetTemplateUseCase {
  constructor(private sheetTemplatesRepository: ISheetTemplatesRepository) {}

  async execute({ id, children, isDefault }: IUpdateSheetTemplateProps) {
    const sheetTemplateExists = await this.sheetTemplatesRepository.get({ id })

    if (!sheetTemplateExists.data) {
      throw new ResourceNotFoundError()
    }

    const formattedContent = verifyAndParseComponents(children)

    await this.sheetTemplatesRepository.update({
      id,
      isDefault,
      children: JSON.stringify(formattedContent),
    })
  }
}
