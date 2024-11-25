import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSheetUseCase } from './create'

describe('Create sheet use case', () => {
  let sheetRepository: InMemorySheetRepository
  let sut: CreateSheetUseCase

  beforeEach(() => {
    sheetRepository = new InMemorySheetRepository()
    sut = new CreateSheetUseCase(sheetRepository)
  })

  it('should be able to create a sheet', async () => {
    await sut.execute({
      name: 'Sheet 1',
      owner: 'user',
      userId: 'user-1',
    })

    const sheetsLenght = await sheetRepository.list({ userId: 'user-1' })
    expect(sheetsLenght.data).toHaveLength(1)
    expect(sheetsLenght.data[0].name).toBe('Sheet 1')
  })
})
