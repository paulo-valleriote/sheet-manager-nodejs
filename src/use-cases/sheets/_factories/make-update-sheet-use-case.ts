import { PrismaSheetsRepository } from '@/repositories/prisma/prisma-sheets-repository'
import { UpdateSheetUseCase } from '../update/update'

export function makeUpdateSheetUseCase() {
  const sheetsRepository = new PrismaSheetsRepository()

  return new UpdateSheetUseCase(sheetsRepository)
}
