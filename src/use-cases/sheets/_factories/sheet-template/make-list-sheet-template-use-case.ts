import { PrismaSheetTemplatesRepository } from '@/repositories/prisma/prisma-sheet-templates-repository'
import { ListSheetTemplatesUseCase } from '../../sheet-template/list-template/list-sheet-templates'

export function makeListSheetTemplateUseCase() {
  const sheetTemplatesRepository = new PrismaSheetTemplatesRepository()

  return new ListSheetTemplatesUseCase(sheetTemplatesRepository)
}
