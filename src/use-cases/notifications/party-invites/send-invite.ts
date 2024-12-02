import { IInviteStatus } from '@/domain/entities/enums/invite-status'
import type { ICreatePartyInviteParams } from '@/repositories/@types/party-invite-notification'
import type { IInviteNotificationsRepository } from '@/repositories/prisma-invite-notifications-repository'

interface ISendInviteParams extends ICreatePartyInviteParams {}

export class SendInviteUseCase {
  constructor(private readonly partyInviteRepository: IInviteNotificationsRepository) {}

  async execute(params: ISendInviteParams): Promise<void> {
    await this.partyInviteRepository.create({
      ...params,
      status: IInviteStatus.PENDING,
    })
  }
}
