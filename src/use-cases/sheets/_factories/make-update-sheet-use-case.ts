import { PrismaSheetTemplatesRepository } from '@/repositories/prisma/prisma-sheet-templates-repository'
import { PrismaSheetsRepository } from '@/repositories/prisma/prisma-sheets-repository'
import { UpdateSheetUseCase } from '../update/update'

export function makeUpdateSheetUseCase() {
  const sheetsRepository = new PrismaSheetsRepository()
  const sheetTemplatesRepository = new PrismaSheetTemplatesRepository()

  return new UpdateSheetUseCase(sheetsRepository, sheetTemplatesRepository)
}
