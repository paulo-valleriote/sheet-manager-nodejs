import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import type { ISheetTemplate } from '@/domain/entities/sheet-template'
import type { IModuleTemplateValue } from '@/repositories/@types/sheet-module-values'
import { describe, expect, it } from 'vitest'
import { updateSheetModuleComponent } from './update-sheet-module-component'

describe('updateSheetModuleComponent', () => {
  it('should update components with new values', async () => {
    const newModuleValues: IModuleTemplateValue[] = [
      {
        id: 'module-id',
        value: 'New Value',
        children: [],
      },
    ]

    const originalSheetTemplate: ISheetTemplate = {
      id: 'sheet-template-id',
      createdAt: new Date(),
      children: JSON.stringify([
        {
          id: 'module-id',
          type: ISheetModuleTypes.TEXT,
          label: 'Label',
          placeholder: 'Placeholder',
          value: 'Old Value',
        },
      ]),
    }

    const updatedComponents = await updateSheetModuleComponent(newModuleValues, originalSheetTemplate)
    expect(updatedComponents).toEqual([
      {
        id: 'module-id',
        type: ISheetModuleTypes.TEXT,
        label: 'Label',
        placeholder: 'Placeholder',
        value: 'New Value',
      },
    ])
  })

})