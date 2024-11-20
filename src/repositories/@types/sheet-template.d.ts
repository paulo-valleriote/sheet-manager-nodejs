import type { ISheetTemplate } from '@/domain/entities/sheet-templates'

interface ISheetTemplateReadonlyOperationParams {
  id: string
}

interface IGetSheetTemplateParams extends ISheetTemplateReadonlyOperationParams {}

interface ICreateSheetTemplateParams {
  id?: string
  children: string
}

interface IUpdateSheetTemplateParams extends ISheetTemplateReadonlyOperationParams {
  children: string
}

interface IDeleteSheetTemplateParams extends ISheetTemplateReadonlyOperationParams {}

interface IGetSheetTemplateResponse {
  data: ISheetTemplate | null
}

interface IListSheetTemplatesResponse {
  data: ISheetTemplate[]
}

export type {
  IGetSheetTemplateParams,
  IGetSheetTemplateResponse,
  IListSheetTemplatesParams,
  IListSheetTemplatesResponse,
  ICreateSheetTemplateParams,
  IUpdateSheetTemplateParams,
  IDeleteSheetTemplateParams,
}
