/**
 * Base entity
 * @description Base entity for general purposes
 * @property {string} id - Entity id
 * @property {Date} createdAt - Entity creation date
 */
export interface IBaseEntity {
  id: string
  createdAt: Date
}

/**
 * Base entity with updated at
 * @description Base entity for entities that need records of when they were updated
 * @property {Date} updatedAt - Entity update date
 */
export interface IBaseEntityWithUpdatedAt extends IBaseEntity {
  updatedAt?: Date
}
