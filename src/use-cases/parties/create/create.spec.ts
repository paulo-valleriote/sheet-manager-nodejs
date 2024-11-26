import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePartyUseCase } from './create'

describe('Create party use case', () => {
  let partyRepository: InMemoryPartyRepository
  let sut: CreatePartyUseCase

  beforeEach(() => {
    partyRepository = new InMemoryPartyRepository()
    sut = new CreatePartyUseCase(partyRepository)
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
})
