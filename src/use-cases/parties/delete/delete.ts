import type { IDeletePartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class DeletePartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: Pick<IDeletePartyParams, 'partyId' | 'dungeonMasterId'>) {
    const party = await this.partiesRepository.findByPartyId({ partyId: data.partyId, dungeonMasterId: data.dungeonMasterId })

    if (!party) {
      throw new ResourceNotFoundError()
    }

    await this.partiesRepository.delete({ partyId: data.partyId, dungeonMasterId: data.dungeonMasterId })
  }
}
