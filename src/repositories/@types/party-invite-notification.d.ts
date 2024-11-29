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
 * @property {string} title - Title of the invite
 * @property {string} content - Content of the invite
 * @property {string} userId - Unique identifier of the user
 */
interface ICreatePartyInviteParams extends Optional<IPartyInviteNotification, 'id' | 'createdAt'> {}

/** Parameters for updating an existing invite
 * @property {string} userId - Unique identifier of the user
 * @property {string} [title] - New title for the invite
 * @property {string} [content] - New content for the invite
 */
interface IUpdatePartyInviteParams extends Omit<IPartyInviteNotificationReadonlyOperationParams, 'partyInviteId'> {
  title?: string
  content?: string
}

/** Parameters for deleting a invite
 * @property {string} partyInviteId - Unique identifier of the invite to delete
 * @property {string} userId - Unique identifier of the user
 */
interface IDeletePartyInviteParams extends IPartyInviteNotificationReadonlyOperationParams {}

interface ICreatePartyInviteResponse {
  data: Pick<IPartyInviteNotification, 'id'>
}

/** Response structure for getting a single invite
 * @property {IPartyInviteNotification | null} data - The retrieved invite data or null if not found
 */
interface IGetPartyInviteResponse {
  data: IPartyInviteNotification | null
}

/** Response structure for listing invites
 * @property {IPartyInviteNotification[]} data - Array of invite data
 */
interface IListPartyInvitesResponse {
  data: IPartyInviteNotification[]
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
