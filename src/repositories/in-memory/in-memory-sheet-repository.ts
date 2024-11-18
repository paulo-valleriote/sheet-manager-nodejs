import { randomUUID } from 'node:crypto';
import type { ISheet } from '@/domain/entities/Sheet';
import type { ISheetsRepository } from '../sheets-repository';
import type { ICreateSheetParams, IDeleteSheetParams, IGetSheetParams, IGetSheetResponse, IListSheetsParams, IListSheetsResponse, IUpdateSheetParams } from '../@types/sheets';

export class InMemorySheetRepository implements ISheetsRepository {
  private sheets: ISheet[] = []

  async list(data: IListSheetsParams): Promise<IListSheetsResponse> {
    const sheets = this.sheets.filter((sheet) => sheet.userId === data.userId)

    return {
      data: sheets
    }
  }

  async get(data: IGetSheetParams): Promise<IGetSheetResponse> {
    const sheet = this.sheets.find((sheet) => 
      sheet.id === data.sheetId
      && sheet.userId === data.userId
    )

    return {
      data: sheet ?? null
    }
  }

  async create(data: ICreateSheetParams): Promise<void> {
    this.sheets.push({
      id: randomUUID(),
      name: data.name,
      userId: data.userId,
      createdAt: new Date(),
    })
  }

  async update(data: IUpdateSheetParams): Promise<void> {
    const sheetIndex = this.sheets.findIndex((sheet) => 
      sheet.id === data.sheetId
      && sheet.userId === data.userId
    )

    this.sheets[sheetIndex] = {
      ...this.sheets[sheetIndex],
      ...data,
      updatedAt: new Date()
    }
	}
  
  async delete(data: IDeleteSheetParams): Promise<void> {
    const sheetIndex = this.sheets.findIndex((sheet) => 
      sheet.id === data.sheetId
      && sheet.userId === data.userId
    )

    this.sheets.splice(sheetIndex, 1)
  }
}
