import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { InMemorySheetTemplateRepository } from '@/repositories/in-memory/in-memory-sheet-template-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSheetUseCase } from '../create/create'
import { UpdateSheetUseCase } from './update'

describe('Update sheet use case', () => {
  let sheetRepository: InMemorySheetRepository
  let sheetTemplateRepository: InMemorySheetTemplateRepository
  let createSheetUseCase: CreateSheetUseCase
  let sut: UpdateSheetUseCase

  beforeEach(() => {
    sheetRepository = new InMemorySheetRepository()
    sheetTemplateRepository = new InMemorySheetTemplateRepository()
    createSheetUseCase = new CreateSheetUseCase(sheetRepository)
    sut = new UpdateSheetUseCase(sheetRepository, sheetTemplateRepository)
  })

  it('should be able to update a sheet', async () => {
    await createSheetUseCase.execute({
      pcName: 'Sheet 1',
      pcAge: 20,
      pcSpecie: 'Human',
      pcRole: 'Warrior',
      owner: 'user',
      userId: 'user-1',
    })

    const createdSheets = await sheetRepository.list({ userId: 'user-1' })

    await sut.execute({
      pcName: 'Sheet 2',
      userId: 'user-1',
    }, createdSheets.data[0].id)

    const sheets = await sheetRepository.list({ userId: 'user-1' })
    expect(sheets.data).toHaveLength(1)
    expect(sheets.data[0].pcName).toBe('Sheet 2')
  })

  it('should not be able to update a sheet with invalid sheetId', async () => {
    await expect(
      sut.execute({
        pcName: 'Sheet 2',
        userId: 'user-1',
      }, 'invalid-sheet-id'),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to update sheet template values without update template itself', async () => {
    await sheetTemplateRepository.create({
      id: 'sheet-template-id',
      children: JSON.stringify([
        { id: 'module-id', type: ISheetModuleTypes.TEXT, label: 'Label', placeholder: 'Placeholder', value: 'Value' },
      ]),
    })

    const sheetTemplate = await sheetTemplateRepository.get({ id: 'sheet-template-id' })

    await createSheetUseCase.execute({
      pcName: 'Sheet 1',
      pcAge: 20,
      pcSpecie: 'Human',
      pcRole: 'Warrior',
      owner: 'user',
      userId: 'user-1',
      sheetTemplateId: sheetTemplate.data.id,
    })

    const createdSheets = await sheetRepository.list({ userId: 'user-1' })
    const createdSheet = createdSheets.data[0]

    const templateValueUpdatePayload = [{ id: 'module-id', value: 'New Value' }]
    await sut.execute({
      pcName: 'Sheet 2',
      userId: 'user-1',
      templateValues: templateValueUpdatePayload,
    }, createdSheet.id)

    const createdSheetAfterUpdate = await sheetRepository.get({ sheetId: createdSheet.id, userId: 'user-1' })
    const sheetTemplateAfterUpdate = await sheetTemplateRepository.get({ id: sheetTemplate.data.id })

    const expectedUpdatedTemplateValues = JSON.stringify([
      {
        id: 'module-id',
        parentId: 'module-id',
        type: 'text',
        label: 'Label',
        placeholder: 'Placeholder',
        value: 'New Value',
      },
    ])

    expect(createdSheet.templateValues).toBe(undefined)
    expect(createdSheetAfterUpdate.data?.templateValues).toBe(expectedUpdatedTemplateValues)
    expect(sheetTemplateAfterUpdate.data.children).toBe(sheetTemplate.data.children)
  })

  it('should throw error if template values are invalid', async () => {
    await sheetTemplateRepository.create({
      id: 'sheet-template-id',
      children: JSON.stringify([{ id: 'module-id', type: ISheetModuleTypes.TEXT, label: 'Label', placeholder: 'Placeholder', value: 'Value' }]),
    })

    const sheetTemplate = await sheetTemplateRepository.get({ id: 'sheet-template-id' })  

    await createSheetUseCase.execute({
      pcName: 'Sheet 1',
      pcAge: 20,
      pcSpecie: 'Human',
      pcRole: 'Warrior',
      owner: 'user',
      userId: 'user-1',
      sheetTemplateId: sheetTemplate.data.id,
    })


    const createdSheets = await sheetRepository.list({ userId: 'user-1' })
    const createdSheet = createdSheets.data[0]

    const templateValueUpdatePayload = [{ id: 'module-id', value: 'New Value' }]
    const templateValueUpdatePayloadWithNonExistingModules = [{ id: 'module-id-2', value: 'New Value 2' }]

    await expect(sut.execute({
      pcName: 'Sheet 2',
      userId: 'user-1',
      templateValues: [...templateValueUpdatePayload, ...templateValueUpdatePayloadWithNonExistingModules],
    }, createdSheet.id)).rejects.toBeInstanceOf(Error)
  })
})
