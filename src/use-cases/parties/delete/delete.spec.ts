import { InMemoryPartyMemberRepository } from '@/repositories/in-memory/in-memory-party-member-repostiory'
import { InMemoryPartyRepository } from '@/repositories/in-memory/in-memory-party-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePartyUseCase } from '../create/create'
import { DeletePartyUseCase } from './delete'

describe('Delete party use case', () => {
  let partyRepository: InMemoryPartyRepository
  let partyMembersRepository: InMemoryPartyMemberRepository
  let createPartyUseCase: CreatePartyUseCase
  let sut: DeletePartyUseCase

  beforeEach(() => {
    partyRepository = new InMemoryPartyRepository()
    partyMembersRepository = new InMemoryPartyMemberRepository()
    createPartyUseCase = new CreatePartyUseCase(partyRepository, partyMembersRepository)
    sut = new DeletePartyUseCase(partyRepository, partyMembersRepository)
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

  it('should delete all party members when a party is deleted', async () => {
    await createPartyUseCase.execute({
      id: 'party-1',
      name: 'Party 1',
      dungeonMasterId: 'user-1',
      description: 'Party description',
      imgUrl: 'https://example.com/image.png',
      maxSize: 10,
    })

    await sut.execute({
      partyId: 'party-1',
    })

    const partyMembers = await partyMembersRepository.findAll({ partyId: 'party-1' })
    expect(partyMembers.data).toHaveLength(0)
  })

  it('should not be able to delete a party that does not exist', async () => {
    await expect(
      sut.execute({
        partyId: 'party-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
