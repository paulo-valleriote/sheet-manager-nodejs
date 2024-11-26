import type { IBaseEntityWithUpdatedAt } from './base-entity'

/**
 * Attributes template entity
 * @description Attributes template application entity, used to create attributes templates for each game type
 * @property {string} attributes - String containing JSON with attributes
 */
export interface IAttributesTemplate extends IBaseEntityWithUpdatedAt {
  attributes: string
}
