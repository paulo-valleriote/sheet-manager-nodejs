import type { ISheetTemplate } from '@/domain/entities/sheet-templates'

interface ISheetTemplateReadonlyOperationParams {
  id: string
}

/**
 * Parameters for getting a single sheet template
 * @interface IGetSheetTemplateParams
 * @property {string} id - The unique identifier of the sheet template
 */
interface IGetSheetTemplateParams extends ISheetTemplateReadonlyOperationParams {}

/**
 * Parameters for creating a new sheet template
 * @interface ICreateSheetTemplateParams
 * @property {string} [id] - Optional unique identifier for the sheet template
 * @property {string} children - The content/structure of the sheet template
 * @property {boolean} [isDefault] - Whether this template should be set as default
 */
interface ICreateSheetTemplateParams {
  id?: string
  children: string
  isDefault?: boolean
}

/**
 * Parameters for updating an existing sheet template
 * @interface IUpdateSheetTemplateParams
 * @property {string} id - The unique identifier of the sheet template to update
 * @property {string} children - The new content/structure for the sheet template
 * @property {boolean} [isDefault] - Whether this template should be set as default
 */
interface IUpdateSheetTemplateParams extends ISheetTemplateReadonlyOperationParams {
  children: string
  isDefault?: boolean
}

/**
 * Parameters for deleting a sheet template
 * @interface IDeleteSheetTemplateParams
 * @property {string} id - The unique identifier of the sheet template to delete
 */
interface IDeleteSheetTemplateParams extends ISheetTemplateReadonlyOperationParams {}

/**
 * Response structure for getting a single sheet template
 * @interface IGetSheetTemplateResponse
 * @property {ISheetTemplate | null} data - The retrieved sheet template or null if not found
 */
interface IGetSheetTemplateResponse {
  data: ISheetTemplate | null
}

/**
 * Response structure for listing multiple sheet templates
 * @interface IListSheetTemplatesResponse
 * @property {ISheetTemplate[]} data - Array of sheet templates
 */
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
