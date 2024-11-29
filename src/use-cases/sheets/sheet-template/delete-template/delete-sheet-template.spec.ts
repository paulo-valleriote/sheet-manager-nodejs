import { InMemorySheetTemplateRepository } from '@/repositories/in-memory/in-memory-sheet-template-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { beforeEach, expect, it } from 'vitest'
import { describe } from 'vitest'
import { DeleteSheetTemplateUseCase } from './delete-sheet-template'

describe('Delete sheet template use case', () => {
  let sheetTemplateRepository: InMemorySheetTemplateRepository
  let sut: DeleteSheetTemplateUseCase

  beforeEach(() => {
    sheetTemplateRepository = new InMemorySheetTemplateRepository()
    sut = new DeleteSheetTemplateUseCase(sheetTemplateRepository)
  })

  it('should be able to delete sheet template', async () => {
    await sheetTemplateRepository.create({
      children: JSON.stringify([]),
    })

    const createdSheetTemplate = await sheetTemplateRepository.list()
    const sheetTemplateId = createdSheetTemplate.data[0].id

    await sut.execute({ id: sheetTemplateId })
    const sheetTemplates = await sheetTemplateRepository.list()
    expect(sheetTemplates.data).toHaveLength(0)
  })

  it('should throw an error if sheet template is not found', async () => {
    await expect(sut.execute({ id: '1' })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
