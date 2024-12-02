import { IInviteStatus } from '@/domain/entities/enums/invite-status'
import type { ICreatePartyInviteParams } from '@/repositories/@types/party-invite-notification'
import type { IInviteNotificationsRepository } from '@/repositories/prisma-invite-notifications-repository'
import { MissingParametersError } from '@/use-cases/_errors/missing-parameters-error'

interface ISendInBatchParams extends ICreatePartyInviteParams {
  users: string[]
}

export class SendInBatchUseCase {
  constructor(private readonly partyInviteRepository: IInviteNotificationsRepository) {}

  async execute(params: ISendInBatchParams): Promise<void> {
    if (params.users.length === 0) {
      throw new MissingParametersError('At least one user is required to sent invites')
    }

    if (params.users.length > 10) {
      throw new Error('Limit reached, only 10 invites can be sent at a time')
    }

    for (const userId of params.users) {
      const partyInvite = {
        ...params,
        userId,
        status: IInviteStatus.PENDING,
      }

      try {
        await this.partyInviteRepository.create(partyInvite)
      } catch (error) {
        console.error('Failed to send invite', error)
      }
    }
  }
}
