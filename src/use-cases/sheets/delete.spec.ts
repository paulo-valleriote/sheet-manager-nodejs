import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSheetUseCase } from './create'
import { DeleteSheetUseCase } from './delete'

describe('Delete sheet use case', () => {
  let sheetRepository: InMemorySheetRepository
  let createSheetUseCase: CreateSheetUseCase
  let sut: DeleteSheetUseCase

  beforeEach(() => {
    sheetRepository = new InMemorySheetRepository()
    createSheetUseCase = new CreateSheetUseCase(sheetRepository)
    sut = new DeleteSheetUseCase(sheetRepository)
  })

  it('should be able to delete a sheet', async () => {
    await createSheetUseCase.execute({
      name: 'Sheet 1',
      userId: 'user-1',
    })

    const sheetsLengthBeforeDelete = await sheetRepository.list({ userId: 'user-1' })
    const createdSheetId = sheetsLengthBeforeDelete.data[0].id

    await sut.execute({
      sheetId: createdSheetId,
      userId: 'user-1',
    })

    const sheetsLengthAfterDelete = await sheetRepository.list({ userId: 'user-1' })
    expect(sheetsLengthAfterDelete.data).toHaveLength(0)
  })

  it('should not be able to delete a sheet that does not exist', async () => {
    await expect(
      sut.execute({
        sheetId: 'sheet-1',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a sheet that user not exists', async () => {
    await expect(
      sut.execute({
        sheetId: 'sheet-1',
        userId: 'user-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a sheet that does not belong to the user', async () => {
    await expect(
      sut.execute({
        sheetId: 'sheet-1',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
