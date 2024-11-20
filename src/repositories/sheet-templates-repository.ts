import type {
  ICreateSheetTemplateParams,
  IDeleteSheetTemplateParams,
  IGetSheetTemplateParams,
  IGetSheetTemplateResponse,
  IListSheetTemplatesResponse,
  IUpdateSheetTemplateParams,
} from './@types/sheet-template'

export interface ISheetTemplatesRepository {
  create(data: ICreateSheetTemplateParams): Promise<void>
  delete(data: IDeleteSheetTemplateParams): Promise<void>
  get(data: IGetSheetTemplateParams): Promise<IGetSheetTemplateResponse>
  list(): Promise<IListSheetTemplatesResponse>
  update(data: IUpdateSheetTemplateParams): Promise<void>
}
