import type { IBaseEntityWithUpdatedAt } from './base-entity'

export interface ISheetTemplate extends IBaseEntityWithUpdatedAt {
  children: string
}
