import type { IBaseEntityWithUpdatedAt } from './base-entity'

export interface IPlayerCharacterAttributes extends IBaseEntityWithUpdatedAt {
  attributesDefined: string
  attributesTemplateId?: string
  sheetId: string
}
