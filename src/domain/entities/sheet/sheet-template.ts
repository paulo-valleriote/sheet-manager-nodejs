import type { IBaseEntityWithUpdatedAt } from '../base-entity'

/**
 * SheetTemplate entity
 * @description Sheet template application entity
 * @property {string} children - Children modules JSON
 */
export interface ISheetTemplate extends IBaseEntityWithUpdatedAt {
  children: string
}
