import { PrismaSheetsRepository } from '@/repositories/prisma/prisma-sheets-repository'
import { DeleteSheetUseCase } from '../delete/delete'

export function makeDeleteSheetUseCase() {
  const sheetsRepository = new PrismaSheetsRepository()

  return new DeleteSheetUseCase(sheetsRepository)
}
