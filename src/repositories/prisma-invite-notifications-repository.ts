import type {
  ICreatePartyInviteParams,
  ICreatePartyInviteResponse,
  IDeletePartyInviteParams,
  IGetPartyInviteParams,
  IGetPartyInviteResponse,
  IListPartyInvitesParams,
  IListPartyInvitesResponse,
  IUpdatePartyInviteParams,
} from '@/repositories/@types/party-invite-notification'

export interface IInviteNotificationsRepository {
  create(data: ICreatePartyInviteParams): Promise<ICreatePartyInviteResponse>
  findAll(params?: IListPartyInvitesParams): Promise<IListPartyInvitesResponse>
  findById(params: Pick<IGetPartyInviteParams, 'partyInviteId'>): Promise<IGetPartyInviteResponse>
  update(params: IUpdatePartyInviteParams, id: string): Promise<void>
  delete(params: Pick<IDeletePartyInviteParams, 'partyInviteId'>): Promise<void>
}
