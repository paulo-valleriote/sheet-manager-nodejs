import type { IPartyRoles } from '@/domain/entities/enums/party-roles'
import { prisma } from '@/lib/prisma'
import type {
  ICreatePartyMemberParams,
  IDeletePartyMemberParams,
  IGetPartyMemberParams,
  IGetPartyMemberResponse,
  IListPartyMembersParams,
  IListPartyMembersResponse,
} from '../@types/party-members'
import type { IPartyMembersRepository } from '../party-members-repository'

export class PrismaPartyMembersRepository implements IPartyMembersRepository {
  async create(data: ICreatePartyMemberParams): Promise<void> {
    await prisma.partyMember.create({
      data: {
        role: data.role,
        party: {
          connect: {
            id: data.partyId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })
  }
  
  async findBy(params: Partial<IGetPartyMemberParams>): Promise<IGetPartyMemberResponse> {
    const partyMember = await prisma.partyMember.findFirst({
      where: {
        userId: params.userId,
        partyId: params.partyId,
      },
    })

    if (!partyMember) {
      return { data: null }
    }

    return {
      data: {
        ...partyMember,
        role: partyMember.role as IPartyRoles,
      },
    }
  }
  async findAll(params: IListPartyMembersParams): Promise<IListPartyMembersResponse> {
    const partyMembers = await prisma.partyMember.findMany({
      where: params,
    })

    return {
      data: partyMembers.map((partyMember) => ({
        ...partyMember,
        role: partyMember.role as IPartyRoles,
      })),
    }
  }
  async delete(data: IDeletePartyMemberParams): Promise<void> {
    const partyMemberEntity = await prisma.partyMember.findFirst({
      where: {
        partyId: data.partyId,
        userId: data.userId,
      },
    })

    await prisma.partyMember.delete({
      where: {
        id: partyMemberEntity?.id,
      },
    })
  }

  async deleteAll(params: Pick<IDeletePartyMemberParams, 'partyId'>): Promise<void> {
    await prisma.partyMember.deleteMany({
      where: { partyId: params.partyId },
    })
  }
}
