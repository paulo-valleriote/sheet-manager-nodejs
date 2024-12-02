import type { IBaseEntityWithUpdatedAt } from '../base-entity'

/**
 * Sheet entity
 * @description Sheet application entity
 * @property {string} pcName - Player character name
 * @property {number} pcAge - Player character age
 * @property {string} pcSpecie - Player character specie
 * @property {string} pcRole - Player character role
 * @property {string} owner - Owner name
 * @property {boolean} isEditable - Is editable
 * @property {string} userId - User id
 * @property {string} sheetTemplateId - Sheet template id
 * @property {string} templateValues - String containing JSON with player-added values
 */
export interface ISheet extends IBaseEntityWithUpdatedAt {
  pcName: string
  pcAge?: number
  pcSpecie?: string
  pcRole?: string
  owner: string
  isEditable: boolean
  userId: string
  sheetTemplateId?: string
  templateValues?: string
}
