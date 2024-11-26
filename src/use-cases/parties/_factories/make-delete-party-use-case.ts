import { PrismaPartiesRepository } from '@/repositories/prisma/prisma-parties-repository'
import { DeletePartyUseCase } from '../delete/delete'

export function makeDeletePartyUseCase() {
  const partiesRepository = new PrismaPartiesRepository()

  return new DeletePartyUseCase(partiesRepository)
}
