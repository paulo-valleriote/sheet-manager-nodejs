import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/core/resource-not-found-error'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePartyUseCase } from '../create/create'
import { GetPartyUseCase } from './get'

describe('Get party use case', () => {
  let partyRepository: InMemoryPartyRepository
  let partyMembersRepository: InMemoryPartyMemberRepository
  let createPartyUseCase: CreatePartyUseCase
  let sut: GetPartyUseCase

  beforeEach(() => {
    partyRepository = new InMemoryPartyRepository()
    partyMembersRepository = new InMemoryPartyMemberRepository()
    createPartyUseCase = new CreatePartyUseCase(partyRepository, partyMembersRepository)
    sut = new GetPartyUseCase(partyRepository)
  })

  it('should be able to get a party', async () => {
    await createPartyUseCase.execute({
      name: 'Party 1',
      dungeonMasterId: 'user-1',
      description: 'Party description',
      imgUrl: 'https://example.com/image.png',
      maxSize: 10,
    })

    const parties = await partyRepository.findAll({ dungeonMasterId: 'user-1' })
    const partyId = parties.data[0].id

    const party = await sut.execute({
      partyId,
    })

    expect(party.data?.name).toBe('Party 1')
  })

  it('should throw an error if no party is found', async () => {
    await expect(
      sut.execute({
        partyId: 'party-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
