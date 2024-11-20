import { prisma } from '@/lib/prisma'
import type {
  ICreateSheetTemplateParams,
  IDeleteSheetTemplateParams,
  IGetSheetTemplateParams,
  IGetSheetTemplateResponse,
  IListSheetTemplatesResponse,
  IUpdateSheetTemplateParams,
} from '../@types/sheet-template'
import type { ISheetTemplatesRepository } from '../sheet-templates-repository'

export class PrismaSheetTemplatesRepository implements ISheetTemplatesRepository {
  async create(data: ICreateSheetTemplateParams): Promise<void> {
    await prisma.sheetTemplate.create({
      data,
    })
  }

  async delete(data: IDeleteSheetTemplateParams): Promise<void> {
    await prisma.sheetTemplate.delete({
      where: {
        id: data.id,
      },
    })
  }

  async get(data: IGetSheetTemplateParams): Promise<IGetSheetTemplateResponse> {
    const sheetTemplate = await prisma.sheetTemplate.findUnique({
      where: {
        id: data.id,
      },
    })

    return { data: sheetTemplate ?? null }
  }

  async list(): Promise<IListSheetTemplatesResponse> {
    const sheetTemplates = await prisma.sheetTemplate.findMany()

    return { data: sheetTemplates }
  }

  async update(data: IUpdateSheetTemplateParams): Promise<void> {
    const { id, ...updateData } = data

    await prisma.sheetTemplate.update({
      where: {
        id,
      },
      data: {
        ...updateData,
      },
    })
  }
}
