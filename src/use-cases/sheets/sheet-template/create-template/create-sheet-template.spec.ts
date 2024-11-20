import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import { InMemorySheetTemplateRepository } from '@/repositories/in-memory/in-memory-sheet-template-repository'
import { EmptyContentOfSheetModuleTypeError } from '@/use-cases/errors/empty-content-of-sheet-module-type-error'
import { InvalidBodyIntoModuleComponentError } from '@/use-cases/errors/invalid-body-into-module-component'
import { beforeEach, expect, it } from 'vitest'
import { describe } from 'vitest'
import { CreateSheetTemplateUseCase } from './create-sheet-template'

describe('Create sheet template use case', () => {
  let sheetTemplateRepository: InMemorySheetTemplateRepository
  let sut: CreateSheetTemplateUseCase

  beforeEach(() => {
    sheetTemplateRepository = new InMemorySheetTemplateRepository()
    sut = new CreateSheetTemplateUseCase(sheetTemplateRepository)
  })

  it('should be able to create a new module type text', async () => {
    await sut.execute({
      children: [
        {
          id: 'module-id',
          parentId: 'sheet-id',
          type: ISheetModuleTypes.TEXT,
          label: 'Label',
          placeholder: 'Placeholder',
          value: 'Value',
        },
      ],
    })

    const sheetTemplates = await sheetTemplateRepository.list()
    expect(sheetTemplates.data).toHaveLength(1)
    expect(JSON.parse(sheetTemplates.data[0].children)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'text',
          label: expect.any(String),
          placeholder: expect.any(String),
          value: expect.any(String),
        }),
      ]),
    )
  })

  it('should throw an error if new module type text is invalid', async () => {
    const sheetId = 'sheet-id'

    await expect(
      sut.execute({
        children: [
          {
            id: 'module-id',
            parentId: sheetId,
            type: ISheetModuleTypes.TEXT,
            label: 'Label',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(InvalidBodyIntoModuleComponentError)
  })

  it('should be able to create a new module type list', async () => {
    const sheetId = 'sheet-id'

    await sut.execute({
      children: [
        {
          id: 'module-id',
          parentId: sheetId,
          type: ISheetModuleTypes.LIST,
          items: [{ label: 'Item label', value: 'Item value' }],
        },
      ],
    })

    const sheetTemplates = await sheetTemplateRepository.list()
    expect(sheetTemplates.data).toHaveLength(1)
    expect(JSON.parse(sheetTemplates.data[0].children)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'list',
          items: expect.arrayContaining([
            expect.objectContaining({
              label: expect.any(String),
              value: expect.any(String),
            }),
          ]),
        }),
      ]),
    )
  })

  it('should throw an error if new module type list is invalid', async () => {
    await expect(
      sut.execute({
        children: [
          {
            id: 'module-id',
            parentId: 'sheet-id',
            type: ISheetModuleTypes.LIST,
            items: [{ label: 'Item label', value: '' }],
          },
        ],
      }),
    ).rejects.toBeInstanceOf(InvalidBodyIntoModuleComponentError)
  })

  it('should be able to create a new module type container', async () => {
    await sut.execute({
      children: [
        {
          id: 'module-id',
          parentId: 'sheet-id',
          type: ISheetModuleTypes.CONTAINER,
          children: [
            {
              id: 'module-id',
              parentId: 'sheet-id',
              type: ISheetModuleTypes.TEXT,
              label: 'Label',
              placeholder: 'Placeholder',
              value: 'Value',
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
          type: 'container',
          children: expect.arrayContaining([
            expect.objectContaining({
              type: 'text',
            }),
          ]),
        }),
      ]),
    )
  })

  it('should throw an error if new module type container is invalid', async () => {
    const sheetId = 'sheet-id'

    await expect(
      sut.execute({
        children: [
          {
            id: 'module-id',
            parentId: sheetId,
            type: ISheetModuleTypes.CONTAINER,
            children: [
              {
                id: 'module-id',
                parentId: sheetId,
                type: ISheetModuleTypes.TEXT,
                placeholder: 'Placeholder',
              },
            ],
          },
        ],
      }),
    ).rejects.toBeInstanceOf(InvalidBodyIntoModuleComponentError)
  })

  it('should throw an error if content array is empty', async () => {
    await expect(
      sut.execute({
        children: [],
      }),
    ).rejects.toBeInstanceOf(EmptyContentOfSheetModuleTypeError)
  })
})
