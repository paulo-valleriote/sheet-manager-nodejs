import type { IDeletePartyMemberParams } from '@/repositories/@types/party-members'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/core/resource-not-found-error'

export class RemoveMemberUseCase {
  constructor(private partyMembersRepository: IPartyMembersRepository) {}

  async execute(data: IDeletePartyMemberParams) {
    const member = await this.partyMembersRepository.findBy({
      partyId: data.partyId,
      userId: data.userId,
    })

    if (member.data === null) {
      throw new ResourceNotFoundError()
    }

    if (member.data.role === 'DUNGEON_MASTER') {
      throw new Error('Dungeon master cannot be removed from the party')
    }

    await this.partyMembersRepository.delete({
      partyId: data.partyId,
      userId: data.userId,
    })
  }
}
