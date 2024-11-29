import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetMemberUseCase } from './get-member'

describe('Get member from party use case', () => {
  let partyMemberRepository: InMemoryPartyMemberRepository
  let sut: GetMemberUseCase

  beforeEach(async () => {
    partyMemberRepository = new InMemoryPartyMemberRepository()
    sut = new GetMemberUseCase(partyMemberRepository)
  })

  it('should be able to get a member from a party', async () => {
    await partyMemberRepository.create({
      id: 'party-member-1',
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })

    const partyMember = await sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
    })

    expect(partyMember.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        partyId: 'party-1',
        userId: 'user-1',
      }),
    )
  })

  it('should throw a error if the member does not exist', async () => {
    await expect(sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
