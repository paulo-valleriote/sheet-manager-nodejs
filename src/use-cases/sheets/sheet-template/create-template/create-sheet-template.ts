import { randomUUID } from 'node:crypto'
import type { IModuleComponent } from '@/domain/entities/module-content'
import type { ISheetTemplatesRepository } from '@/repositories/sheet-templates-repository'
import { EmptyContentOfSheetModuleTypeError } from '@/use-cases/errors/empty-content-of-sheet-module-type-error'
import { verifyAndParseComponents } from '@/utils/sheet-modules/parse-and-validate-module-components'

interface ICreateSheetTemplateProps {
  children: IModuleComponent[]
  isDefault?: boolean
}

export class CreateSheetTemplateUseCase {
  constructor(private sheetTemplatesRepository: ISheetTemplatesRepository) {}

  async execute(data: ICreateSheetTemplateProps) {
    const { children, isDefault } = data

    if (children.length === 0) {
      throw new EmptyContentOfSheetModuleTypeError()
    }

    const id = randomUUID()
    const formattedContent = verifyAndParseComponents(id, children)
    
    await this.sheetTemplatesRepository.create({
      id,
      children: JSON.stringify(formattedContent),
      isDefault,
    })
  }
}
