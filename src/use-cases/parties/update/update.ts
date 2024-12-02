import type { IUpdatePartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/core/resource-not-found-error'

export class UpdatePartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: IUpdatePartyParams, id: string) {
    const party = await this.partiesRepository.findById({ partyId: id })

    if (party.data === null) {
      throw new ResourceNotFoundError()
    }

    await this.partiesRepository.update(data, id)
  }
}
