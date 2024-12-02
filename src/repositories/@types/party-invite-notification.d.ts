import type { IInviteStatus } from '@/domain/entities/enums/invite-status'
import type { IPartyInvite } from '@/domain/entities/party/party-invite'
import type { Optional } from '@/domain/types/optional'

interface IPartyInviteNotificationReadonlyOperationParams {
  partyInviteId: string
  userId: string
}

/** Parameters for retrieving a specific invite
 * @property {string} partyInviteId - Unique identifier of the invite
 * @property {string} userId - Unique identifier of the user
 */
interface IGetPartyInviteParams extends IPartyInviteNotificationReadonlyOperationParams {}

/** Parameters for listing all invites
 * @property {string} userId - Unique identifier of the user
 */
interface IListPartyInvitesParams extends Pick<IPartyInviteNotificationReadonlyOperationParams, 'userId'> {}

/** Parameters for creating a new invite
 * @property {string} [id] - Unique identifier of the invite
 * @property {string} title - Title of the invite
 * @property {string} content - Content of the invite
 * @property {string} userId - Unique identifier of the user
 * @property {IInviteStatus} status - Status of the invite
 */
interface ICreatePartyInviteParams extends Optional<IPartyInvite, 'id' | 'createdAt' | 'viewedAt'> {}

/** Parameters for updating an existing invite
 * @property {string} userId - Unique identifier of the user
 * @property {string} [title] - New title for the invite
 * @property {string} [content] - New content for the invite
 * @property {IInviteStatus} [status] - New status for the invite
 */
interface IUpdatePartyInviteParams
  extends Omit<IPartyInviteNotificationReadonlyOperationParams, 'partyInviteId' | 'userId'> {
  title?: string
  content?: string
  status?: IInviteStatus
}

/** Parameters for deleting a invite
 * @property {string} partyInviteId - Unique identifier of the invite to delete
 * @property {string} userId - Unique identifier of the user
 */
interface IDeletePartyInviteParams extends IPartyInviteNotificationReadonlyOperationParams {}

interface ICreatePartyInviteResponse {
  data: Pick<IPartyInvite, 'id'>
}

/** Response structure for getting a single invite
 * @property {IPartyInvite | null} data - The retrieved invite data or null if not found
 */
interface IGetPartyInviteResponse {
  data: IPartyInvite | null
}

/** Response structure for listing invites
 * @property {IPartyInvite[]} data - Array of invite data
 */
interface IListPartyInvitesResponse {
  data: IPartyInvite[]
}

export type {
  IGetPartyInviteParams,
  IGetPartyInviteResponse,
  IListPartyInvitesParams,
  IListPartyInvitesResponse,
  ICreatePartyInviteParams,
  ICreatePartyInviteResponse,
  IUpdatePartyInviteParams,
  IDeletePartyInviteParams,
}
