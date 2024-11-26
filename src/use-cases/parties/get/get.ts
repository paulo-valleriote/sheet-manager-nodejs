import type { IGetPartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class GetPartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: Pick<IGetPartyParams, 'partyId' | 'dungeonMasterId'>) {
    const party = await this.partiesRepository.findByPartyId({ partyId: data.partyId, dungeonMasterId: data.dungeonMasterId })

    if (!party) {
      throw new ResourceNotFoundError()
    }

    return party
  }
}
