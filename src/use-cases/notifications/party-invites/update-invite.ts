import type { ICreatePartyInviteParams } from '@/repositories/@types/party-invite-notification'
import type { IInviteNotificationsRepository } from '@/repositories/prisma-invite-notifications-repository'
import { MissingParametersError } from '@/use-cases/_errors/missing-parameters-error'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'

interface IUpdateInviteParams extends Partial<ICreatePartyInviteParams> {}

export class UpdateInviteUseCase {
  constructor(private readonly partyInviteRepository: IInviteNotificationsRepository) {}

  async execute(params: IUpdateInviteParams): Promise<void> {
    const { id, ...updateParams } = params

    if (!id) {
      throw new MissingParametersError('Party invite id is required')
    }

    const partyInvite = await this.partyInviteRepository.findById({ partyInviteId: id })

    if (!partyInvite) {
      throw new ResourceNotFoundError()
    }

    await this.partyInviteRepository.update({
      ...updateParams,
      title: updateParams.title ?? undefined,
      content: updateParams.content ?? undefined,
      status: updateParams.status ?? undefined,
    }, id)
  }
}
