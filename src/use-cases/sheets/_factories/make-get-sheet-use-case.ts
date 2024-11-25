import { PrismaSheetsRepository } from '@/repositories/prisma/prisma-sheets-repository'
import { GetSheetUseCase } from '../get/get'

export function makeGetSheetUseCase() {
  const sheetsRepository = new PrismaSheetsRepository()

  return new GetSheetUseCase(sheetsRepository)
}
