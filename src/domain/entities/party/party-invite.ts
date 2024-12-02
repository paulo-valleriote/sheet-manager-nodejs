import type { IBaseNotification } from '../base-notification'
import type { IInviteStatus } from '../enums/invite-status'

export interface IPartyInvite extends IBaseNotification {
  partyId: string
  status: IInviteStatus
}
