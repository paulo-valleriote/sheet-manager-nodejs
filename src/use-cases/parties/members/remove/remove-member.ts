import type { IDeletePartyMemberParams } from '@/repositories/@types/party-members'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

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

    await this.partyMembersRepository.delete({
      partyId: data.partyId,
      userId: data.userId,
    })
  }
}
