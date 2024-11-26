import type { IBaseEntityWithUpdatedAt } from './base-entity'
import type { IPartyRoles } from './enums/party-roles'

/**
 * Role of party entity
 * @description Role of party application entity, used to link users to parties with a specific role
 * @property {string} partyId - Party id
 * @property {string} userId - User id
 * @property {IPartyRoles} role - Role of the user in the party
 */
export interface IRoleOfParty extends IBaseEntityWithUpdatedAt {
  partyId: string
  userId: string
  role: IPartyRoles
}
