import { ISheet } from "@/domain/entities/Sheet";
import type { ISheetsRepository } from "../sheets-repository";

export class InMemorySheetRepository implements ISheetsRepository {
  private sheets: ISheet[] = []

  async list(user_id: string): Promise<ISheet[]> {
    return this.sheets.filter((sheet) => sheet.userId === user_id)
  }

  async get(sheet_id: string): Promise<ISheet | null> {
    const sheet = this.sheets.find((sheet) => sheet.id === sheet_id)

    if (!sheet) {
      return null
    }

    return sheet
  }

  async create(data: any): Promise<void> {
    this.sheets.push(data)
  }

  async update(sheet_id: string, data: any): Promise<void> {
    const sheetIndex = this.sheets.findIndex((sheet) => sheet.id === sheet_id)
    this.sheets[sheetIndex] = data
	}
  
  async delete(sheet_id: string): Promise<void> {
    const sheetIndex = this.sheets.findIndex((sheet) => sheet.id === sheet_id)
    this.sheets.splice(sheetIndex, 1)
  }
}
