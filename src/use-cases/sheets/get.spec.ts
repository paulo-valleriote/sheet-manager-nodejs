import { describe, it, expect, beforeEach } from 'vitest'
import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { CreateSheetUseCase } from './create'
import { GetSheetUseCase } from './get'

describe('Get sheet use case', () => {
  let sheetRepository: InMemorySheetRepository
  let createSheetUseCase: CreateSheetUseCase
  let getSheetUseCase: GetSheetUseCase

  beforeEach(() => {
    sheetRepository = new InMemorySheetRepository()
    createSheetUseCase = new CreateSheetUseCase(sheetRepository)
    getSheetUseCase = new GetSheetUseCase(sheetRepository)
  })

	it('should be able to get a sheet', async () => {
		await createSheetUseCase.execute({
			name: 'Sheet 1',
			userId: 'user-1'
		})

    const sheets = await sheetRepository.list({ userId: 'user-1' })
    const sheetId = sheets.data[0].id

    const sheet = await getSheetUseCase.execute({
      sheetId,
      userId: 'user-1'
    })

    expect(sheet.data?.name).toBe('Sheet 1')
	})

  it('should not be able to get a sheet from another user', async () => {
    await createSheetUseCase.execute({
      name: 'Sheet 1',
      userId: 'user-2'
    })

    const sheets = await sheetRepository.list({ userId: 'user-2' })
    const sheetId = sheets.data[0].id

    await expect(getSheetUseCase.execute({
      sheetId,
      userId: 'user-1'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should return data as null if no sheet is found', async () => {
    await expect(getSheetUseCase.execute({
      sheetId: 'sheet-1',
      userId: 'user-1'
    })).rejects.toBeInstanceOf(Error)
  })
})
