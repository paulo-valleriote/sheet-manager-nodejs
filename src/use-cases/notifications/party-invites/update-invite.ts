import type { ICreatePartyInviteParams } from '@/repositories/@types/party-invite-notification'
import type { IInviteNotificationsRepository } from '@/repositories/prisma-invite-notifications-repository'

interface IUpdateInviteParams extends ICreatePartyInviteParams {}

export class UpdateInviteUseCase {
  constructor(private readonly partyInviteRepository: IInviteNotificationsRepository) {}

  async execute(params: IUpdateInviteParams): Promise<void> {
    const { id, ...updateParams } = params

    if (!id) {
      throw new Error('Party invite id is required')
    }

    const partyInvite = await this.partyInviteRepository.findById({ partyInviteId: id })

    if (!partyInvite) {
      throw new Error('Party invite not found')
    }

    await this.partyInviteRepository.update({
      ...updateParams,
      title: updateParams.title ?? undefined,
      content: updateParams.content ?? undefined,
      status: params.status
    }, id)
  }
}
