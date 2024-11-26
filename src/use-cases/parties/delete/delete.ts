import type { IDeletePartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class DeletePartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: Pick<IDeletePartyParams, 'partyId'>) {
    const party = await this.partiesRepository.findById({ partyId: data.partyId })

    if (party.data === null) {
      throw new ResourceNotFoundError()
    }

    await this.partiesRepository.delete({ partyId: data.partyId })
  }
}
