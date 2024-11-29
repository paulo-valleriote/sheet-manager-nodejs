import type { ICreatePartyMemberParams } from '@/repositories/@types/party-members'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import type { IPartyMembersRepository } from '@/repositories/party-members-repository'
import type { IUsersRepository } from '@/repositories/users-repository'

export class AddMemberUseCase {
  constructor(
    private partyMembersRepository: IPartyMembersRepository,
    private partyRepository: IPartiesRepository,
    private userRepository: IUsersRepository,
  ) {}

  async execute(data: ICreatePartyMemberParams) {
    const [party, user] = await Promise.all([
      this.checkIfPartyExists(data.partyId),
      this.checkIfUserExists(data.userId),
    ])

    if (party.maxSize !== null) {
      await this.checkIfPartyIsFull(party.id, party.maxSize)
    }

    await this.partyMembersRepository.create(data)
  }

  private async checkIfPartyExists(partyId: string) {
    const party = await this.partyRepository.findById({ partyId })

    if (party.data === null) {
      throw new Error('Party not found')
    }

    return party.data
  }

  private async checkIfUserExists(userId: string) {
    const user = await this.userRepository.getById({ userId })
    
    if (user.data === null) {
      throw new Error('User not found')
    }

    return user
  }

  private async checkIfPartyIsFull(partyId: string, partyLimit: number) {
    const partyMembers = await this.partyMembersRepository.findAll({ partyId })

    if (partyMembers.data.length >= partyLimit) {
      throw new Error('Party is full')
    }
  }
}
