import { prisma } from '@/lib/prisma'
import type {
  ICreatePartyParams,
  IDeletePartyParams,
  IGetPartyParams,
  IGetPartyResponse,
  IListPartiesParams,
  IUpdatePartyParams,
} from '../@types/parties'
import type { IPartiesRepository } from '../parties-repository'

export class PrismaPartiesRepository implements IPartiesRepository {
  async create(data: ICreatePartyParams) {
    await prisma.party.create({
      data,
    })
  }

  async findAll(data: IListPartiesParams) {
    const parties = await prisma.party.findMany({
      where: data,
    })

    return { data: parties }
  }

  async findById(params: Pick<IGetPartyParams, 'partyId'>): Promise<IGetPartyResponse> {
    const party = await prisma.party.findUnique({
      where: {
        id: params.partyId,
      },
    })

    return { data: party ?? null }
  }

  async findAllByDungeonMasterId(
    data: Pick<IListPartiesParams, 'dungeonMasterId'>,
  ) {
    const parties = await prisma.party.findMany({
      where: data,
    })

    return { data: parties }
  }

  async findByPartyId(data: Pick<IGetPartyParams, 'dungeonMasterId' | 'partyId'>) {
    const party = await prisma.party.findUnique({
      where: {
        id: data.partyId,
        dungeonMasterId: data.dungeonMasterId,
      },
    })

    if (!party) {
      return null
    }

    return party
  }

  async update(data: IUpdatePartyParams, id: string) {
    await prisma.party.update({
      where: { id },
      data,
    })
  }

  async delete(data: Pick<IDeletePartyParams, 'dungeonMasterId' | 'partyId'>) {
    await prisma.party.delete({
      where: {
        id: data.partyId,
        dungeonMasterId: data.dungeonMasterId,
      },
    })
  }
}
