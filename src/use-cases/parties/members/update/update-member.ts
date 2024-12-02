import type { IUpdatePartyMemberParams } from '@/repositories/@types/party-members'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/core/resource-not-found-error'

export class UpdateMemberUseCase {
  constructor(private partyMembersRepository: IPartyMembersRepository) {}

  async execute(data: IUpdatePartyMemberParams) {
    const member = await this.partyMembersRepository.findBy({
      partyId: data.partyId,
      userId: data.userId,
    })

    if (member.data === null) {
      throw new ResourceNotFoundError()
    }

    if (member.data.role === 'DUNGEON_MASTER' && data.sheetId) {
      throw new Error('Dungeon master cannot have a sheet')
    }

    await this.partyMembersRepository.update(data)
  }
}
