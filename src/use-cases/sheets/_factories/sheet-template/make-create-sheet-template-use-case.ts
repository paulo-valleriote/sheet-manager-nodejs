import { PrismaSheetTemplatesRepository } from '@/repositories/prisma/prisma-sheet-templates-repository'
import { CreateSheetTemplateUseCase } from '../../sheet-template/create-template/create-sheet-template'

export function makeCreateSheetTemplateUseCase() {
  const sheetTemplatesRepository = new PrismaSheetTemplatesRepository()

  return new CreateSheetTemplateUseCase(sheetTemplatesRepository)
}
