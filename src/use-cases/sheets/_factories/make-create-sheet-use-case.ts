import { PrismaSheetsRepository } from '@/repositories/prisma/prisma-sheets-repository'
import { CreateSheetUseCase } from '../create/create'

export function makeCreateSheetUseCase() {
  const sheetsRepository = new PrismaSheetsRepository()

  return new CreateSheetUseCase(sheetsRepository)
}
