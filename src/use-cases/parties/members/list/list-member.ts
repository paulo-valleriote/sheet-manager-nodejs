import type { IListPartyMembersParams } from '@/repositories/@types/party-members'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'

export class ListMembersUseCase {
  constructor(private partyMembersRepository: IPartyMembersRepository) {}

  async execute(data: IListPartyMembersParams) {
    return this.partyMembersRepository.findAll(data)
  }
}
