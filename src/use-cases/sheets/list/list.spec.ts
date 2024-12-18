import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSheetUseCase } from '../create/create'
import { ListSheetUseCase } from './list'

describe('List sheets use case', () => {
  let sheetRepository: InMemorySheetRepository
  let createSheetUseCase: CreateSheetUseCase
  let sut: ListSheetUseCase

  beforeEach(() => {
    sheetRepository = new InMemorySheetRepository()
    createSheetUseCase = new CreateSheetUseCase(sheetRepository)
    sut = new ListSheetUseCase(sheetRepository)
  })

  it('should be able to list created sheets', async () => {
    await Promise.all([
      createSheetUseCase.execute({
        pcName: 'Sheet 1',
        owner: 'user',
        userId: 'user-1',
      }),
      createSheetUseCase.execute({
        pcName: 'Sheet 2',
        owner: 'user',
        userId: 'user-1',
      }),
    ])

    const sheets = await sut.execute({ userId: 'user-1' })
    expect(sheets.data).toHaveLength(2)
    expect(sheets.data[0].pcName).toBe('Sheet 1')
    expect(sheets.data[1].pcName).toBe('Sheet 2')
  })

  it('should not be able to list sheets from another user', async () => {
    await Promise.all([
      createSheetUseCase.execute({
        pcName: 'Sheet 2',
        owner: 'user',
        userId: 'user-2',
      }),
    ])

    const sheets = await sut.execute({ userId: 'user-1' })
    expect(sheets.data).toHaveLength(0)
  })

  it('should return an empty array if no sheets are found', async () => {
    const sheets = await sut.execute({ userId: 'user-1' })
    expect(sheets.data).toHaveLength(0)
  })
})
