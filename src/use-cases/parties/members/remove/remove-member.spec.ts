import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RemoveMemberUseCase } from './remove-member'

describe('Remove member from party use case', () => {
  let partyMemberRepository: InMemoryPartyMemberRepository
  let partyRepository: InMemoryPartyRepository
  let userRepository: InMemoryUserRepository
  let sut: RemoveMemberUseCase

  beforeEach(async () => {
    partyMemberRepository = new InMemoryPartyMemberRepository()
    partyRepository = new InMemoryPartyRepository()
    userRepository = new InMemoryUserRepository()
    sut = new RemoveMemberUseCase(partyMemberRepository)
  })

  it('should be able to remove a member from a party', async () => {
    await partyMemberRepository.create({
      id: 'party-member-1',
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })

    await sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
    })

    const parties = await partyMemberRepository.findAll({ partyId: 'party-1', userId: 'user-1' })
    expect(parties.data).toHaveLength(0)
  })

  it('should throw a error if the member does not exist', async () => {
    await expect(sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
    })).rejects.toBeInstanceOf(Error)
  })
})
