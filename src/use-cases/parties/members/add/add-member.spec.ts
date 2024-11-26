import { IUserRole } from "@/domain/entities/enums/user-roles"
import { InMemoryPartyMemberRepository } from "@/repositories/in-memory/in-memory-party-member-repostiory"
import { InMemoryPartyRepository } from "@/repositories/in-memory/in-memory-party-repository"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { AddMemberUseCase } from "./add-member"


describe('Add member to party use case', () => {
  let partyMemberRepository: InMemoryPartyMemberRepository
  let partyRepository: InMemoryPartyRepository
  let userRepository: InMemoryUserRepository
  let sut: AddMemberUseCase

  beforeEach(async () => {
    partyMemberRepository = new InMemoryPartyMemberRepository()
    partyRepository = new InMemoryPartyRepository()
    userRepository = new InMemoryUserRepository()
    sut = new AddMemberUseCase(partyMemberRepository, partyRepository, userRepository)

    await partyRepository.create({
      id: 'party-1',
      dungeonMasterId: 'dungeon-master-1',
      name: 'Party 1',
      maxSize: 1,
      description: 'Party 1 description',
      imgUrl: 'https://example.com/party-1.png',
    })

    await userRepository.create({
      id: 'user-1',
      email: 'user1@example.com',
      passwordHash: 'password',
      role: IUserRole.USER,
    })
  })

  it('should be able to add a member to a party', async () => {
    await sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })

    const parties = await partyMemberRepository.findAll({ partyId: 'party-1', userId: 'user-1' })
    expect(parties.data).toHaveLength(1)
    expect(parties.data[0].userId).toBe('user-1')
    expect(parties.data[0].role).toBe('player')
  })

  it('should not be able to add a member to a party if the member already exists', async () => {
    await sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })

    await expect(sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to add a member to a party if the party is full', async () => {
    await sut.execute({
      partyId: 'party-1',
      userId: 'user-1',
      role: 'player',
    })

    await expect(sut.execute({
      partyId: 'party-1',
      userId: 'user-2',
      role: 'player',
    })).rejects.toBeInstanceOf(Error)
  })
})
