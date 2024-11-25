import { PrismaSheetTemplatesRepository } from '@/repositories/prisma/prisma-sheet-templates-repository'
import { DeleteSheetTemplateUseCase } from '../../sheet-template/delete-template/delete-sheet-template'

export function makeDeleteSheetTemplateUseCase() {
  const sheetTemplatesRepository = new PrismaSheetTemplatesRepository()

  return new DeleteSheetTemplateUseCase(sheetTemplatesRepository)
}
