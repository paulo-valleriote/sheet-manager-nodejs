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

    return { data: sheet ?? null }
  }

  async list(data: IListSheetsParams): Promise<IListSheetsResponse> {
    const sheets = await prisma.sheet.findMany({
      where: {
        userId: data.userId,
      },
    })

    return { data: sheets }
  }

  async update(data: IUpdateSheetParams): Promise<void> {
    const { sheetId, userId, ...updateData } = data

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
