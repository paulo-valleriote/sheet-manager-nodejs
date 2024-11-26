import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePartyUseCase } from '../create/create'
import { DeletePartyUseCase } from './delete'

describe('Delete party use case', () => {
  let partyRepository: InMemoryPartyRepository
  let createPartyUseCase: CreatePartyUseCase
  let sut: DeletePartyUseCase

  beforeEach(() => {
    partyRepository = new InMemoryPartyRepository()
    createPartyUseCase = new CreatePartyUseCase(partyRepository)
    sut = new DeletePartyUseCase(partyRepository)
  })

  it('should be able to delete a party', async () => {
    await createPartyUseCase.execute({
      name: 'Party 1',
      dungeonMasterId: 'user-1',
      description: 'Party description',
      imgUrl: 'https://example.com/image.png',
      maxSize: 10,
    })

    const partiesBeforeDelete = await partyRepository.findAll({ dungeonMasterId: 'user-1' })
    const createdPartyId = partiesBeforeDelete.data[0].id

    await sut.execute({
      partyId: createdPartyId,
    })

    const partiesAfterDelete = await partyRepository.findAll({ dungeonMasterId: 'user-1' })
    expect(partiesAfterDelete.data).toHaveLength(0)
  })

  it('should not be able to delete a party that does not exist', async () => {
    await expect(
      sut.execute({
        partyId: 'party-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
