import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePartyUseCase } from '../create/create'
import { UpdatePartyUseCase } from './update'

describe('Update party use case', () => {
  let partyRepository: InMemoryPartyRepository
  let createPartyUseCase: CreatePartyUseCase
  let sut: UpdatePartyUseCase

  beforeEach(() => {
    partyRepository = new InMemoryPartyRepository()
    createPartyUseCase = new CreatePartyUseCase(partyRepository)
    sut = new UpdatePartyUseCase(partyRepository)
  })

  it('should be able to update a party', async () => {
    await createPartyUseCase.execute({
      name: 'Party 1',
      dungeonMasterId: 'user-1',
      description: 'Party description',
      imgUrl: 'https://example.com/image.png',
      maxSize: 10,
    })

    const createdParties = await partyRepository.findAll({ dungeonMasterId: 'user-1' })

    await sut.execute({
      name: 'Party 2',
      description: 'Party description 2',
      imgUrl: 'https://example.com/image2.png',
      maxSize: 15,
      dungeonMasterId: 'user-1',
      playerIds: [],
    }, createdParties[0].id)

    const parties = await partyRepository.findAll({ dungeonMasterId: 'user-1' })
    expect(parties).toHaveLength(1)
    expect(parties[0].name).toBe('Party 2')
  })

  it('should not be able to update a party with invalid partyId', async () => {
    await expect(
      sut.execute({
        name: 'Party 2',
        description: 'Party description 2',
        imgUrl: 'https://example.com/image2.png',
        maxSize: 15,
        dungeonMasterId: 'user-1',
        playerIds: [],
      }, 'invalid-party-id'),
    ).rejects.toBeInstanceOf(Error)
  })
})
