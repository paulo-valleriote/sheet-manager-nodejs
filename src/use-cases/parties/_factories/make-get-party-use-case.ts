import { PrismaPartiesRepository } from '@/repositories/prisma/prisma-parties-repository'
import { GetPartyUseCase } from '../get/get'

export function makeGetPartyUseCase() {
  const partiesRepository = new PrismaPartiesRepository()

  return new GetPartyUseCase(partiesRepository)
}
