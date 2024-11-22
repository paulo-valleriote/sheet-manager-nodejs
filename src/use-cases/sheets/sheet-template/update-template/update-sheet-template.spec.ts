import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import { InMemorySheetTemplateRepository } from '@/repositories/in-memory/in-memory-sheet-template-repository'
import { InvalidBodyIntoModuleComponentError } from '@/use-cases/errors/invalid-body-into-module-component'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { beforeEach, expect, it } from 'vitest'
import { describe } from 'vitest'
import { UpdateSheetTemplateUseCase } from './update-sheet-template'

describe('Update sheet template use case', () => {
  let sheetTemplateRepository: InMemorySheetTemplateRepository
  let sut: UpdateSheetTemplateUseCase

  beforeEach(() => {
    sheetTemplateRepository = new InMemorySheetTemplateRepository()
    sut = new UpdateSheetTemplateUseCase(sheetTemplateRepository)
  })

  it('should be able to update a sheet template', async () => {
    await sheetTemplateRepository.create({
      id: 'sheet-template-id',
      children: JSON.stringify([
        {
          id: 'module-id',
          parentId: 'sheet-id',
          type: ISheetModuleTypes.TEXT,
          label: 'Label',
          placeholder: 'Placeholder',
          value: 'Value',
        },
      ]),
    })

    await sut.execute({
      id: 'sheet-template-id',
      children: [
        {
          id: 'module-id',
          parentId: 'sheet-id',
          type: ISheetModuleTypes.LIST,
          items: [
            {
              id: 'item-id',
              label: 'Item label',
              value: 'Item value',
            },
          ],
        },
      ],
    })

    const sheetTemplates = await sheetTemplateRepository.list()
    expect(sheetTemplates.data).toHaveLength(1)
    expect(JSON.parse(sheetTemplates.data[0].children)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'list',
          items: [
            {
              id: 'item-id',
              label: 'Item label',
              value: 'Item value',
            },
          ],
        }),
      ]),
    )
  })

  it('should not be able to update a sheet template with invalid content', async () => {
    await sheetTemplateRepository.create({
      id: 'sheet-template-id',
      children: JSON.stringify([
        {
          id: 'module-id',
          parentId: 'sheet-id',
          type: ISheetModuleTypes.TEXT,
          label: 'Label',
          placeholder: 'Placeholder',
          value: 'Value',
        },
      ]),
    })

    await expect(
      sut.execute({
        id: 'sheet-template-id',
        children: [
          {
            id: 'module-id',
            parentId: 'sheet-id',
            type: ISheetModuleTypes.TEXT,
            label: 'Label',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(InvalidBodyIntoModuleComponentError)
  })

  it('should not be able to update a sheet template when it not exists', async () => {
    await expect(
      sut.execute({
        id: 'sheet-template-id',
        children: [],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
