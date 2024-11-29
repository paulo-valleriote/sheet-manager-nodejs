import type { IBaseEntityWithUpdatedAt } from '../base-entity'

/**
 * Party entity
 * @description Party application entity
 * @property {string} name - Party name
 * @property {string} description - Party description
 * @property {string} imgUrl - Party image URL
 * @property {number} maxSize - Party maximum size
 * @property {IUser[]} players - Party current players
 * @property {IUser} dungeonMaster - Party dungeon master
 */
export interface IParty extends IBaseEntityWithUpdatedAt {
  name: string
  description: string | null
  imgUrl: string | null
  maxSize: number | null
  dungeonMasterId: string
}
