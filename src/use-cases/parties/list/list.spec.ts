import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePartyUseCase } from '../create/create'
import { ListPartyUseCase } from './list'

describe('List parties use case', () => {
  let partyRepository: InMemoryPartyRepository
  let partyMembersRepository: InMemoryPartyMemberRepository
  let createPartyUseCase: CreatePartyUseCase
  let sut: ListPartyUseCase

  beforeEach(() => {
    partyRepository = new InMemoryPartyRepository()
    partyMembersRepository = new InMemoryPartyMemberRepository()
    createPartyUseCase = new CreatePartyUseCase(partyRepository, partyMembersRepository)
    sut = new ListPartyUseCase(partyRepository)
  })

  it('should be able to list created parties', async () => {
    await Promise.all([
      createPartyUseCase.execute({
        name: 'Party 1',
        dungeonMasterId: 'user-1',
        description: 'Party description',
        imgUrl: 'https://example.com/image.png',
        maxSize: 10,
      }),
      createPartyUseCase.execute({
        name: 'Party 2',
        dungeonMasterId: 'user-1',
        description: 'Party description',
        imgUrl: 'https://example.com/image.png',
        maxSize: 10,
      }),
    ])

    const parties = await sut.execute({ dungeonMasterId: 'user-1' })
    expect(parties.data).toHaveLength(2)
    expect(parties.data[0].name).toBe('Party 1')
    expect(parties.data[1].name).toBe('Party 2')
  })

  it('should not be able to list parties from another user', async () => {
    await Promise.all([
      createPartyUseCase.execute({
        name: 'Party 2',
        dungeonMasterId: 'user-2',
        description: 'Party description',
        imgUrl: 'https://example.com/image.png',
        maxSize: 10,
      }),
    ])

    const parties = await sut.execute({ dungeonMasterId: 'user-1' })
    expect(parties.data).toHaveLength(0)
  })

  it('should return an empty array if no parties are found', async () => {
    const parties = await sut.execute({ dungeonMasterId: 'user-1' })
    expect(parties.data).toHaveLength(0)
  })
})
