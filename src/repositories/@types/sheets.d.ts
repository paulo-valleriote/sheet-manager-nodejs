interface ISheetReadonlyOperationParams {
  sheetId: string
  userId: string
}

interface IGetSheetParams extends ISheetReadonlyOperationParams {}
interface IListSheetsParams extends Pick<ISheetReadonlyOperationParams, "userId"> {}

interface ICreateSheetParams {
	name: string
	userId: string
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
	IDeleteSheetParams
}