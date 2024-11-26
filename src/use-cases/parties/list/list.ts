import type { IListPartiesParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'

export class ListPartyUseCase {
  constructor(private partiesRepository: IPartiesRepository) {}

  async execute(data: IListPartiesParams) {
    return await this.partiesRepository.findAll(data)
  }
}
