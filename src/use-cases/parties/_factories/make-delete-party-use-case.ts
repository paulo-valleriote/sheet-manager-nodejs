import { PrismaPartiesRepository } from '@/repositories/prisma/prisma-parties-repository'
import { PrismaPartyMembersRepository } from '@/repositories/prisma/prisma-party-members-repository'
import { DeletePartyUseCase } from '../delete/delete'

export function makeDeletePartyUseCase() {
  const partiesRepository = new PrismaPartiesRepository()
  const partyMembersRepository = new PrismaPartyMembersRepository()

  return new DeletePartyUseCase(partiesRepository, partyMembersRepository)
}
