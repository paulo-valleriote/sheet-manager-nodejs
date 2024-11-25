import type { IBaseEntityWithUpdatedAt } from './base-entity'

export interface ISheet extends IBaseEntityWithUpdatedAt {
  pcName: string
  pcAge?: number
  pcSpecie?: string
  pcRole?: string
  owner: string
  isActive: boolean
  isEditable: boolean
  userId: string
  sheetTemplateId?: string
  templateValues?: string
}
