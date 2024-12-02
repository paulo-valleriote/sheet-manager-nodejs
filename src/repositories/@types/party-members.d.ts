import type { IPartyMember } from '@/domain/entities/party/party-member'
import type { Optional } from '@/domain/types/optional'

interface IPartyMemberReadonlyOperationParams {
  partyId: string
  userId: string
}

/**
 * Parameters for retrieving a specific party member
 * @property {string} userId - Unique identifier of the user
 * @property {string} partyId - Unique identifier of the party
 */
interface IGetPartyMemberParams extends Pick<IPartyMemberReadonlyOperationParams, 'userId' | 'partyId'> {}

/**
 * Parameters for listing party members
 * @property {string} [partyId] - Optional unique identifier of the party to filter by
 * @property {string} [userId] - Optional unique identifier of the user to filter by
 */
interface IListPartyMembersParams extends Optional<IPartyMemberReadonlyOperationParams, 'partyId' | 'userId'> {}

/**
 * Parameters for creating a new party member
 * @property {string} role - Role of the member in the party (player or dungeon master)
 * @property {string} userId - Unique identifier of the user
 * @property {string} partyId - Unique identifier of the party
 * @property {string} [id] - Optional unique identifier for the party member
 * @property {Date} [createdAt] - Optional creation timestamp
 * @property {Date} [updatedAt] - Optional last update timestamp
 */
interface ICreatePartyMemberParams extends Optional<IPartyMember, 'id' | 'createdAt'> {
  role: IPartyRoles
  userId: string
  partyId: string
  sheetId?: string
}

/**
 * Parameters for updating a party member
 * @property {string} userId - Unique identifier of the user
 * @property {IPartyRoles} [role] - Optional new role for the member
 * @property {string} [sheetId] - Optional new sheet id for the member
 */
interface IUpdatePartyMemberParams extends IPartyMemberReadonlyOperationParams {
  id?: string
  role?: IPartyRoles
  sheetId?: string
}

/**
 * Parameters for deleting a party member
 * @property {string} partyId - Unique identifier of the party
 * @property {string} userId - Unique identifier of the user
 */
interface IDeletePartyMemberParams extends IPartyMemberReadonlyOperationParams {}

/**
 * Response for getting a single party member
 * @property {IPartyMember | null} data - The party member data or null if not found
 */
interface IGetPartyMemberResponse {
  data: IPartyMember | null
}

/**
 * Response for listing party members
 * @property {IPartyMember[]} data - Array of party members
 */
interface IListPartyMembersResponse {
  data: IPartyMember[]
}

export type {
  IGetPartyMemberParams,
  IGetPartyMemberResponse,
  IListPartyMembersParams,
  IListPartyMembersResponse,
  ICreatePartyMemberParams,
  IUpdatePartyMemberParams,
  IDeletePartyMemberParams,
}
