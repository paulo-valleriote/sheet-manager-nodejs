import { PrismaSheetsRepository } from '@/repositories/prisma/prisma-sheets-repository'
import { ListSheetUseCase } from '../list'

export function makeListSheetUseCase() {
  const sheetsRepository = new PrismaSheetsRepository()

  return new ListSheetUseCase(sheetsRepository)
}
