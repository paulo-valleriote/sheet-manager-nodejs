import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSheetUseCase } from '../create/create'
import { GetSheetUseCase } from './get'

describe('Get sheet use case', () => {
  let sheetRepository: InMemorySheetRepository
  let createSheetUseCase: CreateSheetUseCase
  let sut: GetSheetUseCase

  beforeEach(() => {
    sheetRepository = new InMemorySheetRepository()
    createSheetUseCase = new CreateSheetUseCase(sheetRepository)
    sut = new GetSheetUseCase(sheetRepository)
  })

  it('should be able to get a sheet', async () => {
    await createSheetUseCase.execute({
      name: 'Sheet 1',
      owner: 'user',
      userId: 'user-1',
    })

    const sheets = await sheetRepository.list({ userId: 'user-1' })
    const sheetId = sheets.data[0].id

    const sheet = await sut.execute({
      sheetId,
      userId: 'user-1',
    })

    expect(sheet.data?.name).toBe('Sheet 1')
  })

  it('should not be able to get a sheet from another user', async () => {
    await createSheetUseCase.execute({
      name: 'Sheet 1',
      owner: 'user',
      userId: 'user-2',
    })

    const sheets = await sheetRepository.list({ userId: 'user-2' })
    const sheetId = sheets.data[0].id

    await expect(
      sut.execute({
        sheetId,
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should return data as null if no sheet is found', async () => {
    await expect(
      sut.execute({
        sheetId: 'sheet-1',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
