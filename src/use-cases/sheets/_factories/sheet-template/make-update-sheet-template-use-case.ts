import { PrismaSheetTemplatesRepository } from '@/repositories/prisma/prisma-sheet-templates-repository'
import { UpdateSheetTemplateUseCase } from '../../sheet-template/update-template/update-sheet-template'

export function makeUpdateSheetTemplateUseCase() {
  const sheetTemplatesRepository = new PrismaSheetTemplatesRepository()

  return new UpdateSheetTemplateUseCase(sheetTemplatesRepository)
}
