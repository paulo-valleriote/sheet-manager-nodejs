import type { ISheet } from '@/domain/entities/sheet'
import type { Optional } from '@/domain/types/optional'

interface ISheetReadonlyOperationParams {
  sheetId: string
  userId: string
}

/**
 * Parameters for listing user's sheets
 * @property {string} sheetId - The unique identifier of the sheet
 * @property {string} userId - The unique identifier of the user
 */
interface IGetSheetParams extends ISheetReadonlyOperationParams {}

/**
 * Parameters for creating a new sheet
 * @property {string} [id] - The sheet identifier
 * @property {string} userId - The user identifier
 * @property {string} pcName - The character name
 * @property {number} pcAge - The character age
 * @property {string} pcRole - The character role/class
 * @property {string} pcSpecie - The character species
 * @property {Date} [createdAt] - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 * @property {boolean} [isEditable] - Sheet edit permission status
 * @property {string} [sheetTemplateId] - Template identifier
 * @property {string} [templateValues] - Template custom values
 */
interface ICreateSheetParams extends Optional<ISheet, 'id' | 'createdAt' | 'updatedAt' | 'isEditable' | 'sheetTemplateId' | 'templateValues'> {}

/**
 * Parameters for updating an existing sheet
 * @property {string} userId - The user identifier
 * @property {string} [pcName] - The character name
 * @property {number} [pcAge] - The character age
 * @property {string} [pcRole] - The character role/class
 * @property {string} [pcSpecie] - The character species
 * @property {string} [templateValues] - Template custom values
 */
interface IUpdateSheetParams extends Omit<ISheetReadonlyOperationParams, 'sheetId'> {
  pcName?: string
  pcAge?: number
  pcRole?: string
  pcSpecie?: string
  templateValues?: string
}

/**
 * Parameters for deleting a sheet
 * @property {string} sheetId - The unique identifier of the sheet
 * @property {string} userId - The unique identifier of the user
 */
interface IDeleteSheetParams extends ISheetReadonlyOperationParams {}

/**
 * Response structure for getting a single sheet
 * @property {ISheet | null} data - The retrieved sheet data or null if not found
 */
interface IGetSheetResponse {
  data: ISheet | null
}

/**
 * Response structure for listing sheets
 * @property {ISheet[]} data - Array of retrieved sheets
 */
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
