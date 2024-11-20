import { PrismaSheetTemplatesRepository } from '@/repositories/prisma/prisma-sheet-templates-repository'
import { GetSheetTemplateUseCase } from '../../sheet-template/get-template/get-sheet-template'

export function makGetSheetTemplateUseCase() {
  const sheetTemplatesRepository = new PrismaSheetTemplatesRepository()

  return new GetSheetTemplateUseCase(sheetTemplatesRepository)
}
