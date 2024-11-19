import type {
  ICreateSheetParams,
  IDeleteSheetParams,
  IGetSheetParams,
  IGetSheetResponse,
  IListSheetsParams,
  IListSheetsResponse,
  IUpdateSheetParams,
} from './@types/sheets'

export interface ISheetsRepository {
  create(data: ICreateSheetParams): Promise<void>
  delete(data: IDeleteSheetParams): Promise<void>
  get(data: IGetSheetParams): Promise<IGetSheetResponse>
  list(data: IListSheetsParams): Promise<IListSheetsResponse>
  update(data: IUpdateSheetParams): Promise<void>
}
