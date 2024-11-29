import type { IDeletePartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'

export class DeletePartyUseCase {
  constructor(
    private partiesRepository: IPartiesRepository,
    private partyMembersRepository: IPartyMembersRepository,
  ) {}

  async execute(data: Pick<IDeletePartyParams, 'partyId'>) {
    const party = await this.partiesRepository.findById({ partyId: data.partyId })

    if (party.data === null) {
      throw new ResourceNotFoundError()
    }
    
    await this.partiesRepository.delete({ partyId: party.data.id })
    await this.partyMembersRepository.deleteAll({ partyId: party.data.id })
  }
}
