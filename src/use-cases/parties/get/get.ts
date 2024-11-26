import type { IGetPartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class GetPartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: Pick<IGetPartyParams, 'partyId'>) {
    const party = await this.partiesRepository.findById({ partyId: data.partyId })

    if (party.data === null) {
      throw new ResourceNotFoundError()
    }

    return party
  }
}
