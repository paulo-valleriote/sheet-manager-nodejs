import type { IGetPartyMemberParams } from '@/repositories/@types/party-members'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/core/resource-not-found-error'

export class GetMemberUseCase {
  constructor(private partyMembersRepository: IPartyMembersRepository) {}

  async execute(data: IGetPartyMemberParams) {
    const player = await this.partyMembersRepository.findBy(data)

    if (player.data === null) {
      throw new ResourceNotFoundError()
    }

    return player
  }
}
