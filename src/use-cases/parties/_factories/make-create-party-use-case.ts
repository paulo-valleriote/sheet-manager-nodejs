
import { PrismaPartiesRepository } from '@/repositories/prisma/prisma-parties-repository'
import { CreatePartyUseCase } from '../create/create'

export function makeCreatePartyUseCase() {
  const partiesRepository = new PrismaPartiesRepository()

  return new CreatePartyUseCase(partiesRepository)
}
