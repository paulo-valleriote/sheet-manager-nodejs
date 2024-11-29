
import { PrismaPartiesRepository } from '@/repositories/prisma/prisma-parties-repository'
import { PrismaPartyMembersRepository } from '@/repositories/prisma/prisma-party-members-repository'
import { CreatePartyUseCase } from '../create/create'

export function makeCreatePartyUseCase() {
  const partiesRepository = new PrismaPartiesRepository()
  const partyMembersRepository = new PrismaPartyMembersRepository()

  return new CreatePartyUseCase(partiesRepository, partyMembersRepository)
}
