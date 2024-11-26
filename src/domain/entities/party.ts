import type { IBaseEntityWithUpdatedAt } from './base-entity'
import type { IUser } from './user'

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
  description: string
  imgUrl: string
  maxSize: number
  players: IUser[]
  dungeonMaster: IUser
}
