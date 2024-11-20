import type { IModuleComponent } from '@/domain/entities/module-content'
import type { ISheetTemplatesRepository } from '@/repositories/sheet-templates-repository'
import { EmptyContentOfSheetModuleTypeError } from '@/use-cases/errors/empty-content-of-sheet-module-type-error'
import { verifyAndParseComponents } from '@/utils/sheet-modules/parse-and-validate-module-components'

interface ICreateSheetTemplateProps {
  children: IModuleComponent[]
}

export class CreateSheetTemplateUseCase {
  constructor(private sheetTemplatesRepository: ISheetTemplatesRepository) {}

  async execute(data: ICreateSheetTemplateProps) {
    const { children } = data

    if (children.length === 0) {
      throw new EmptyContentOfSheetModuleTypeError()
    }

    const formattedContent = verifyAndParseComponents(children)
    await this.sheetTemplatesRepository.create({
      children: JSON.stringify(formattedContent),
    })
  }
}
