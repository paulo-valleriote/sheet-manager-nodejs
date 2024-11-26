import { PrismaPartiesRepository } from '@/repositories/prisma/prisma-parties-repository'
import { UpdatePartyUseCase } from '../update/update'

export function makeUpdatePartyUseCase() {
  const partiesRepository = new PrismaPartiesRepository()
  return new UpdatePartyUseCase(partiesRepository)
}
