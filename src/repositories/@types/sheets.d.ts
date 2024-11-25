import type { ISheet } from '@/domain/entities/sheet'
import type { Optional } from '@/domain/types/optional'

interface ISheetReadonlyOperationParams {
  sheetId: string
  userId: string
}

interface IGetSheetParams extends ISheetReadonlyOperationParams {}
interface IListSheetsParams extends Pick<ISheetReadonlyOperationParams, 'userId'> {}

interface ICreateSheetParams extends Optional<ISheet, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'isEditable' | 'sheetTemplateId' | 'templateValues'> {}

interface IUpdateSheetParams extends Omit<ISheetReadonlyOperationParams, 'sheetId'> {
  pcName?: string
  pcAge?: number
  pcRole?: string
  pcSpecie?: string
  templateValues?: string
}

interface IDeleteSheetParams extends ISheetReadonlyOperationParams {}

interface IGetSheetResponse {
  data: ISheet | null
}

interface IListSheetsResponse {
  data: ISheet[]
}

export type {
  IGetSheetParams,
  IGetSheetResponse,
  IListSheetsParams,
  IListSheetsResponse,
  ICreateSheetParams,
  IUpdateSheetParams,
  IDeleteSheetParams,
  IModuleTemplateValue,
}
