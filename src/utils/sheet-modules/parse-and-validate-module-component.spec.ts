import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import type { IModuleComponent } from '@/domain/entities/sheet/module-content'
import { InvalidBodyIntoModuleComponentError } from '@/use-cases/_errors/extended/sheet/invalid-body-into-module-component'
import { describe, expect, it } from 'vitest'
import { verifyAndParseComponents } from './parse-and-validate-module-components'

describe('verifyAndParseComponents', () => {
  it('should verify and parse valid components', () => {
    const components: IModuleComponent[] = [
      {
        id: 'module-id',
        parentId: 'sheet-id',
        type: ISheetModuleTypes.TEXT,
        label: 'Label',
        placeholder: 'Placeholder',
        value: 'Value',
      },
      {
        id: 'module-id',
        parentId: 'sheet-id',
        type: ISheetModuleTypes.LIST,
        items: [{ id: 'item-id', label: 'Item label', value: 'Item value' }],
      },
    ]

    const result = verifyAndParseComponents('sheet-id', components)
    expect(result).toEqual(components)
  })

  it('should throw an error for invalid components', () => {
    const components: IModuleComponent[] = [
      {
        id: 'module-id',
        parentId: 'sheet-id',
        type: ISheetModuleTypes.TEXT,
        label: 'Label',
      },
    ]

    expect(() => verifyAndParseComponents('sheet-id', components)).toThrow(InvalidBodyIntoModuleComponentError)
  })
})
