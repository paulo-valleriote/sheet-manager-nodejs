import type { ISheetTemplate } from '@/domain/entities/sheet-template'
import type { IModuleTemplateValue, IUpdateSheetParams } from '@/repositories/@types/sheets'
import type { ISheetTemplatesRepository } from '@/repositories/sheet-templates-repository'
import type { ISheetsRepository } from '@/repositories/sheets-repository'
import { updateSheetModuleComponent } from '@/utils/sheet-modules/update-sheet-module-component'


interface IUpdateSheetUseCaseParams extends Omit<IUpdateSheetParams, 'templateValues'> {
  templateValues?: IModuleTemplateValue[]
}

/**
 * Update sheet use case
 * @description Update a sheet and template values
 *
 * @param data - Update sheet data
 * @param id - Sheet id
 */
export class UpdateSheetUseCase {
  constructor(
    private sheetsRepository: ISheetsRepository,
    private sheetTemplateRepository: ISheetTemplatesRepository,
  ) {}

  async execute(data: IUpdateSheetUseCaseParams, id: string) {
    const sheet = await this.sheetsRepository.get({
      sheetId: id,
      userId: data.userId,
    })

    if (!sheet.data) {
      throw new Error('Sheet not found')
    }

    const originalTemplate = await this.sheetTemplateRepository.get({ id: sheet.data.sheetTemplateId ?? '' })

    if (!originalTemplate.data) {
      await this.sheetsRepository.update({ ...data, templateValues: sheet.data.templateValues }, id)
      return
    }

    const parsedTemplateValues = this.parseTemplateValues(data.templateValues || [], originalTemplate.data)
    const updatedTemplateValues = await updateSheetModuleComponent(parsedTemplateValues, originalTemplate.data)

    await this.sheetsRepository.update({ ...data, templateValues: JSON.stringify(updatedTemplateValues) }, id)
  }

  /**
   * Parse template values
   * @description Ensure valid format for template values and check if all values are valid for current sheet template
   *
   * @param newTemplateValues - New template values
   * @param originalTemplate - Original template
   */
  private parseTemplateValues(newTemplateValues: IModuleTemplateValue[], originalTemplate: ISheetTemplate) {
    if (!newTemplateValues || newTemplateValues.length === 0) {
      return []
    }

    const originalTemplateValues =
      originalTemplate.children !== undefined ? (JSON.parse(originalTemplate.children) as IModuleTemplateValue[]) : []
    if (newTemplateValues.some(({ id: newValueId }) => !originalTemplateValues.find(({ id }) => id === newValueId))) {
      throw new Error('Some template values are not valid')
    }

    return newTemplateValues
  }
}
