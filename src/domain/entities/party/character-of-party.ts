import type { IBaseEntityWithUpdatedAt } from '../base-entity'

/**
 * Character - Party relation entity
 * @description Character of party application entity, used to link characters of each player to parties
 * @property {string} partyId - Party id
 * @property {string} characterId - Character id
 * @property {string} userId - User id
 */
export interface ICharacterOfParty extends IBaseEntityWithUpdatedAt {
  partyId: string
  characterId: string
  userId: string
}
