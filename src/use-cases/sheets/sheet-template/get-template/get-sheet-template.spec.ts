import { InMemorySheetTemplateRepository } from '@/repositories/in-memory/in-memory-sheet-template-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { beforeEach, expect, it } from 'vitest'
import { describe } from 'vitest'
import { GetSheetTemplateUseCase } from './get-sheet-template'

describe('Get sheet template use case', () => {
  let sheetTemplateRepository: InMemorySheetTemplateRepository
  let sut: GetSheetTemplateUseCase

  beforeEach(() => {
    sheetTemplateRepository = new InMemorySheetTemplateRepository()
    sut = new GetSheetTemplateUseCase(sheetTemplateRepository)
  })

  it('should be able to get sheet template', async () => {
    await sheetTemplateRepository.create({
      children: JSON.stringify([]),
    })

    const createdSheetTemplate = await sheetTemplateRepository.list()
    const sheetTemplateId = createdSheetTemplate.data[0].id

    const sheetTemplate = await sut.execute({ id: sheetTemplateId })
    expect(sheetTemplate.data).not.toBeNull()
    expect(sheetTemplate.data).toEqual(expect.objectContaining({ id: expect.any(String) }))
  })

  it('should be able to get sheet template with children', async () => {
    await sheetTemplateRepository.create({
      children: JSON.stringify([{ type: 'text', content: 'Hello, world!' }]),
    })

    const createdSheetTemplate = await sheetTemplateRepository.list()
    const sheetTemplateId = createdSheetTemplate.data[0].id

    const sheetTemplate = await sut.execute({ id: sheetTemplateId })
    expect(sheetTemplate.data).not.toBeNull()
    expect(sheetTemplate.data).toEqual(expect.objectContaining({ id: expect.any(String) }))
    expect(sheetTemplate.data).toEqual(expect.objectContaining({ children: expect.any(String) }))
  })

  it('should throw an error if sheet template is not found', async () => {
    await expect(sut.execute({ id: '1' })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
