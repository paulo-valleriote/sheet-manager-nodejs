import type { ICreatePartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'

export class CreatePartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: ICreatePartyParams) {
    await this.partiesRepository.create(data)
  }
}
