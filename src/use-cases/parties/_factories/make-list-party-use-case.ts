import { PrismaPartiesRepository } from '@/repositories/prisma/prisma-parties-repository'
import { ListPartyUseCase } from '../list/list'

export function makeListPartyUseCase() {
  const partiesRepository = new PrismaPartiesRepository()

  return new ListPartyUseCase(partiesRepository)
}
