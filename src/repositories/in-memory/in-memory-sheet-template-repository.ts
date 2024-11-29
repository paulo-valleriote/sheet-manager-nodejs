import { randomUUID } from 'node:crypto'
import type { ISheetTemplate } from '@/domain/entities/sheet/sheet-template'
import type {
  ICreateSheetTemplateParams,
  IDeleteSheetTemplateParams,
  IGetSheetTemplateParams,
  IGetSheetTemplateResponse,
  IListSheetTemplatesResponse,
  IUpdateSheetTemplateParams,
} from '../@types/sheet-template'
import type { ISheetTemplatesRepository } from '../sheet-templates-repository'

export class InMemorySheetTemplateRepository implements ISheetTemplatesRepository {
  private sheetTemplates: ISheetTemplate[] = []

  async list(): Promise<IListSheetTemplatesResponse> {
    const sheetTemplates = this.sheetTemplates

    return {
      data: sheetTemplates,
    }
  }

  async get(data: IGetSheetTemplateParams): Promise<IGetSheetTemplateResponse> {
    const sheetTemplate = this.sheetTemplates.find((sheetTemplate) => sheetTemplate.id === data.id)

    return {
      data: sheetTemplate ?? null,
    }
  }

  async create(data: ICreateSheetTemplateParams): Promise<void> {
    this.sheetTemplates.push({
      id: data.id ?? randomUUID(),
      ...data,
      createdAt: new Date(),
    })
  }

  async update(data: IUpdateSheetTemplateParams): Promise<void> {
    const sheetIndex = this.sheetTemplates.findIndex((sheetTemplate) => sheetTemplate.id === data.id)

    this.sheetTemplates[sheetIndex] = {
      ...this.sheetTemplates[sheetIndex],
      ...data,
      updatedAt: new Date(),
    }
  }

  async delete(data: IDeleteSheetTemplateParams): Promise<void> {
    const sheetIndex = this.sheetTemplates.findIndex((sheetTemplate) => sheetTemplate.id === data.id)

    this.sheetTemplates.splice(sheetIndex, 1)
  }
}
