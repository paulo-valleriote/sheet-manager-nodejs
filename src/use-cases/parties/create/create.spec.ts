import { IPartyRoles } from '@/domain/entities/enums/party-roles'
import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePartyUseCase } from './create'

describe('Create party use case', () => {
  let partyRepository: InMemoryPartyRepository
  let partyMembersRepository: InMemoryPartyMemberRepository
  let sut: CreatePartyUseCase

  beforeEach(() => {
    partyRepository = new InMemoryPartyRepository()
    partyMembersRepository = new InMemoryPartyMemberRepository()
    sut = new CreatePartyUseCase(partyRepository, partyMembersRepository)
  })

  it('should be able to create a party', async () => {
    await sut.execute({
      name: 'Party 1',
      dungeonMasterId: 'user-1',
      description: 'Party description',
      imgUrl: 'https://example.com/image.png',
      maxSize: 10,
    })

    const parties = await partyRepository.findAll({ dungeonMasterId: 'user-1' })
    expect(parties.data).toHaveLength(1)
    expect(parties.data[0].name).toBe('Party 1')
  })

  it('should create a party member with dungeon master role when a party is created', async () => {
    await sut.execute({
      id: 'party-1',
      name: 'Party 1',
      dungeonMasterId: 'user-1',
      description: 'Party description',
      imgUrl: 'https://example.com/image.png',
      maxSize: 10,
    })

    const partyMembers = await partyMembersRepository.findAll({ partyId: 'party-1' })
    expect(partyMembers.data).toHaveLength(1)
    expect(partyMembers.data[0].role).toBe(IPartyRoles.DUNGEON_MASTER)
  })
})
