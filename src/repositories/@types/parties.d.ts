import type { IParty } from '@/domain/entities/party/party'
import type { Optional } from '@/domain/types/optional'

interface IPartyReadonlyOperationParams {
  partyId: string
  dungeonMasterId: string
}

/** Parameters for retrieving a specific party
 * @property {string} partyId - Unique identifier of the party
 * @property {string} dungeonMasterId - Unique identifier of the Dungeon Master
 */
interface IGetPartyParams extends IPartyReadonlyOperationParams {}

/** Parameters for listing all parties
 * @property {string} dungeonMasterId - Unique identifier of the Dungeon Master
 */
interface IListPartiesParams extends Pick<IPartyReadonlyOperationParams, 'dungeonMasterId'> {}

/** Parameters for creating a new party
 * @property {string} name - Name of the party
 * @property {string} description - Description of the party
 * @property {string} imgUrl - URL of the party's image
 * @property {number} maxSize - Maximum number of players allowed
 * @property {string} dungeonMasterId - Unique identifier of the Dungeon Master
 */
interface ICreatePartyParams extends Optional<IParty, 'id' | 'createdAt' | 'updatedAt'> {
  sheetId?: string
}

/** Parameters for updating an existing party
 * @property {string} dungeonMasterId - Unique identifier of the Dungeon Master
 * @property {string} [name] - New name for the party
 * @property {string} [description] - New description for the party
 * @property {string} [imgUrl] - New image URL for the party
 * @property {number} [maxSize] - New maximum size for the party
 */
interface IUpdatePartyParams extends Omit<IPartyReadonlyOperationParams, 'partyId'> {
  name?: string
  description?: string
  imgUrl?: string
  maxSize?: number
}

/** Parameters for deleting a party
 * @property {string} partyId - Unique identifier of the party to delete
 * @property {string} dungeonMasterId - Unique identifier of the Dungeon Master
 */
interface IDeletePartyParams extends IPartyReadonlyOperationParams {}

interface ICreatePartyResponse {
  data: Pick<IParty, 'id'>
}

/** Response structure for getting a single party
 * @property {IParty | null} data - The retrieved party data or null if not found
 */
interface IGetPartyResponse {
  data: IParty | null
}

/** Response structure for listing parties
 * @property {IParty[]} data - Array of party data
 */
interface IListPartiesResponse {
  data: IParty[]
}

export type {
  IGetPartyParams,
  IGetPartyResponse,
  IListPartiesParams,
  IListPartiesResponse,
  ICreatePartyParams,
  ICreatePartyResponse,
  IUpdatePartyParams,
  IDeletePartyParams,
}
