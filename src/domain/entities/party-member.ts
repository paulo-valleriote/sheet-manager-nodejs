import type { IBaseEntityWithUpdatedAt } from './base-entity'
import type { IPartyRoles } from './enums/party-roles'

/**
 * Party member entity
 * @description Party member application entity, used to link users to parties with a specific role
 * @property {string} partyId - Party id
 * @property {string} userId - User id
 * @property {IPartyRoles} role - Role of the user in the party
 */
export interface IPartyMember extends IBaseEntityWithUpdatedAt {
  partyId: string
  userId: string
  role: IPartyRoles
}
