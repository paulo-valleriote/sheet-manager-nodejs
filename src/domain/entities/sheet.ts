import type { IBaseEntityWithUpdatedAt } from './base-entity'

export interface ISheet extends IBaseEntityWithUpdatedAt {
  name: string
  age: number | null
  specie: string | null
  characterClass: string | null
  owner: string
  active: boolean
  isEditable: boolean
  userId: string
}
