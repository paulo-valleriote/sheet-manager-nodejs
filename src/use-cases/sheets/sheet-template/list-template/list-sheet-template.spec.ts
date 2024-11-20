import { InMemorySheetTemplateRepository } from '@/repositories/in-memory/in-memory-sheet-template-repository'
import { beforeEach, expect, it } from 'vitest'
import { describe } from 'vitest'
import { ListSheetTemplatesUseCase } from './list-sheet-templates'


describe('List sheet templates use case', () => {
  let sheetTemplateRepository: InMemorySheetTemplateRepository
  let sut: ListSheetTemplatesUseCase

  beforeEach(() => {
    sheetTemplateRepository = new InMemorySheetTemplateRepository()
    sut = new ListSheetTemplatesUseCase(sheetTemplateRepository)
  })

  it('should be able to list sheet templates', async () => {
    await sheetTemplateRepository.create({
      children: JSON.stringify([]),
    })

    const sheetTemplates = await sut.execute()
    expect(sheetTemplates.data).toHaveLength(1)
  })

  it('should be able to list sheet templates with children', async () => {
    await sheetTemplateRepository.create({
      children: JSON.stringify([{ type: 'text', content: 'Hello, world!' }]),
    })

    const sheetTemplates = await sut.execute()
    expect(sheetTemplates.data).toHaveLength(1)
    expect(sheetTemplates.data[0].children).toEqual(JSON.stringify([{ type: 'text', content: 'Hello, world!' }]))
  })

  it('should return an empty array if there are no sheet templates', async () => {
    const sheetTemplates = await sut.execute()
    expect(sheetTemplates.data).toHaveLength(0)
  })
})
