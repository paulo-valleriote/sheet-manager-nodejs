import type { IBaseEntityWithUpdatedAt } from './base-entity'

/**
 * PlayerCharacterAttributes entity
 * @description Player character attributes application entity
 * @property {string} attributesDefined - String containing JSON with player-defined attributes
 * @property {string} attributesTemplateId - Attributes template id
 * @property {string} sheetId - Sheet id
 */
export interface IPlayerCharacterAttributes extends IBaseEntityWithUpdatedAt {
  attributesDefined: string
  attributesTemplateId?: string
  sheetId: string
}
