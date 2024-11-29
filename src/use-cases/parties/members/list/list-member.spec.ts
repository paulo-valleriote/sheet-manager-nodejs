import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListMembersUseCase } from './list-member'

describe('List members from party use case', () => {
  let partyMemberRepository: InMemoryPartyMemberRepository
  let sut: ListMembersUseCase

  beforeEach(async () => {
    partyMemberRepository = new InMemoryPartyMemberRepository()
    sut = new ListMembersUseCase(partyMemberRepository)
  })

  it('should be able to list members from a party', async () => {
    await partyMemberRepository.create({
      id: 'party-member-1',
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })

    const partyMembers = await sut.execute({
      partyId: 'party-1',
    })

    expect(partyMembers.data).toHaveLength(1)
    expect(partyMembers.data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        partyId: 'party-1',
        userId: 'user-1',
      }),
    )
  })

  it('should return empty array if the party does not have any members', async () => {
    const partyMembers = await sut.execute({
      partyId: 'party-1',
    })

    expect(partyMembers.data).toHaveLength(0)
  })
})
