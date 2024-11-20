interface ISheetReadonlyOperationParams {
  sheetId: string
  userId: string
}

interface IGetSheetParams extends ISheetReadonlyOperationParams {}
interface IListSheetsParams extends Pick<ISheetReadonlyOperationParams, 'userId'> {}

interface ICreateSheetParams {
  name: string
  owner: string
  age?: number
  specie?: string
  characterClass?: string
  active?: boolean
  isEditable?: boolean
  userId: string
  templateId?: string
}

interface IUpdateSheetParams extends ISheetReadonlyOperationParams {
  name: string
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
}
