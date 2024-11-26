import type { IUpdatePartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class UpdatePartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: IUpdatePartyParams, id: string) {
    const party = await this.partiesRepository.findByPartyId({ partyId: id, dungeonMasterId: data.dungeonMasterId })

    if (!party) {
      throw new ResourceNotFoundError()
    }

    await this.partiesRepository.update(data, id)
  }
}
