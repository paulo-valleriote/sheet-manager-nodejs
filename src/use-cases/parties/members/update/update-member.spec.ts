import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateMemberUseCase } from './update-member'

describe('Remove member from party use case', () => {
  let partyMemberRepository: InMemoryPartyMemberRepository
  let sut: UpdateMemberUseCase

  beforeEach(async () => {
    partyMemberRepository = new InMemoryPartyMemberRepository()
    sut = new UpdateMemberUseCase(partyMemberRepository)
  })

  it('should be able to update a member from a party', async () => {
    await partyMemberRepository.create({
      id: 'party-member-1',
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })

    await sut.execute({
      id: 'party-member-1',
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
      sheetId: 'sheet-1',
    })

    const parties = await partyMemberRepository.findAll({ partyId: 'party-1', userId: 'user-1' })
    expect(parties.data).toHaveLength(1)
    expect(parties.data?.[0].sheetId).toBe('sheet-1')
  })
})
