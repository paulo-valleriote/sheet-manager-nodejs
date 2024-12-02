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
import type { IInviteNotificationsRepository } from '@/repositories/prisma-invite-notifications-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/core/resource-not-found-error'
import { type IBaseNotification, NotificationBaseClass } from '../notification-base-class'

interface IUpdatePartyInvite extends IUpdatePartyInviteParams {
  partyInviteId: string
}

interface ICreatePartyInvite extends IBaseNotification<ICreatePartyInviteParams, ICreatePartyInviteResponse> {}
interface IGetPartyInvite extends IBaseNotification<IGetPartyInviteParams, IGetPartyInviteResponse> {}
interface IListPartyInvites extends IBaseNotification<IListPartyInvitesParams, IListPartyInvitesResponse> {}
interface IUpdatePartyInvite extends IBaseNotification<IUpdatePartyInvite, void> {}
interface IDeletePartyInvite extends IBaseNotification<IDeletePartyInviteParams, void> {}

export class PartyInviteNotification extends NotificationBaseClass<
  ICreatePartyInvite,
  IGetPartyInvite,
  IListPartyInvites,
  IUpdatePartyInvite,
  IDeletePartyInvite
> {
  constructor(private readonly partyInviteRepository: IInviteNotificationsRepository) {
    super()
  }

  async create(params: ICreatePartyInviteParams): Promise<ICreatePartyInviteResponse> {
    return this.partyInviteRepository.create(params)
  }

  async get(params: IGetPartyInviteParams): Promise<IGetPartyInviteResponse> {
    const partyInvite = await this.partyInviteRepository.findById(params)

    if (!partyInvite) {
      throw new ResourceNotFoundError()
    }

    return partyInvite
  }

  async list(params?: IListPartyInvitesParams): Promise<IListPartyInvitesResponse> {
    return this.partyInviteRepository.findAll(params)
  }

  async update(params: IUpdatePartyInvite): Promise<void> {
    const { partyInviteId, ...updateParams } = params

    return this.partyInviteRepository.update(updateParams, partyInviteId)
  }

  async delete(params: IDeletePartyInviteParams): Promise<void> {
    return this.partyInviteRepository.delete(params)
  }
}
