import { IPartyRoles } from '@/domain/entities/enums/party-roles'
import type { ICreatePartyParams } from '@/repositories/@types/parties'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'

export class CreatePartyUseCase {
  constructor(
    private partiesRepository: IPartiesRepository,
    private partyMembersRepository: IPartyMembersRepository,
  ) {}

  async execute(data: ICreatePartyParams) {
    const {
      data: { id },
    } = await this.partiesRepository.create(data)

    await this.partyMembersRepository.create({
      partyId: id,
      userId: data.dungeonMasterId,
      sheetId: data.sheetId ?? undefined,
      role: IPartyRoles.DUNGEON_MASTER,
    })
  }
}
