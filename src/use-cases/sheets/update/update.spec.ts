import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSheetUseCase } from '../create/create'
import { UpdateSheetUseCase } from './update'

describe('Update sheet use case', () => {
  let sheetRepository: InMemorySheetRepository
  let createSheetUseCase: CreateSheetUseCase
  let sut: UpdateSheetUseCase

  beforeEach(() => {
    sheetRepository = new InMemorySheetRepository()
    createSheetUseCase = new CreateSheetUseCase(sheetRepository)
    sut = new UpdateSheetUseCase(sheetRepository)
  })

  it('should be able to update a sheet', async () => {
    await createSheetUseCase.execute({
      name: 'Sheet 1',
      owner: 'user',
      userId: 'user-1',
    })

    const createdSheets = await sheetRepository.list({ userId: 'user-1' })

    await sut.execute({
      sheetId: createdSheets.data[0].id,
      name: 'Sheet 2',
      userId: 'user-1',
    })

    const sheets = await sheetRepository.list({ userId: 'user-1' })
    expect(sheets.data).toHaveLength(1)
    expect(sheets.data[0].name).toBe('Sheet 2')
  })

  it('should not be able to update a sheet with invalid sheetId', async () => {
    await expect(
      sut.execute({
        sheetId: 'invalid-sheet-id',
        name: 'Sheet 2',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
