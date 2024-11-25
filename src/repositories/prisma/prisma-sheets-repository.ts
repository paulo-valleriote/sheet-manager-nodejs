import { prisma } from '@/lib/prisma'
import type {
  ICreateSheetParams,
  IDeleteSheetParams,
  IGetSheetParams,
  IGetSheetResponse,
  IListSheetsParams,
  IListSheetsResponse,
  IUpdateSheetParams,
} from '../@types/sheets'
import type { ISheetsRepository } from '../sheets-repository'

export class PrismaSheetsRepository implements ISheetsRepository {
  async create(data: ICreateSheetParams): Promise<void> {
    await prisma.sheet.create({
      data,
    })
  }

  async delete(data: IDeleteSheetParams): Promise<void> {
    await prisma.sheet.delete({
      where: {
        id: data.sheetId,
      },
    })
  }

  async get(data: IGetSheetParams): Promise<IGetSheetResponse> {
    const sheet = await prisma.sheet.findUnique({
      where: {
        id: data.sheetId,
      },
    })

    if (!sheet) return { data: null }

    return {
      data: {
        ...sheet,
        pcAge: sheet.pcAge ?? undefined,
        pcSpecie: sheet.pcSpecie ?? undefined,
        pcRole: sheet.pcRole ?? undefined,
        sheetTemplateId: sheet.sheetTemplateId ?? undefined,
        templateValues: sheet.templateValues ? JSON.stringify(sheet.templateValues) : undefined,
      },
    }
  }

  async list(data: IListSheetsParams): Promise<IListSheetsResponse> {
    const sheets = await prisma.sheet.findMany({
      where: {
        userId: data.userId,
      },
    })

    return { data: sheets.map((sheet) => ({
        ...sheet,
        pcAge: sheet.pcAge ?? undefined,
        pcSpecie: sheet.pcSpecie ?? undefined,
        pcRole: sheet.pcRole ?? undefined,
        sheetTemplateId: sheet.sheetTemplateId ?? undefined,
        templateValues: sheet.templateValues ? JSON.stringify(sheet.templateValues) : undefined,
      })),
    }
  }

  async update(data: IUpdateSheetParams, sheetId: string): Promise<void> {
    const { userId, ...updateData } = data

    await prisma.sheet.update({
      where: {
        id: sheetId,
        AND: {
          user: {
            id: userId,
          },
        },
      },
      data: {
        ...updateData,
      },
    })
  }
}
