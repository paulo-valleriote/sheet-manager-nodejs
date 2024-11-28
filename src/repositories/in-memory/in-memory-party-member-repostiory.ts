import { randomUUID } from 'node:crypto'
import type { IPartyMember } from '@/domain/entities/party-member'
import type {
  ICreatePartyMemberParams,
  IDeletePartyMemberParams,
  IGetPartyMemberParams,
  IGetPartyMemberResponse,
  IListPartyMembersParams,
  IListPartyMembersResponse,
} from '../@types/party-members'
import type { IPartyMembersRepository } from '../party-members-repository'

export class InMemoryPartyMemberRepository implements IPartyMembersRepository {
  private partyMembers: IPartyMember[] = []

  async create(data: ICreatePartyMemberParams): Promise<void> {
    this.partyMembers.push({
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
    })
  }

  async findBy(params: Partial<IGetPartyMemberParams>): Promise<IGetPartyMemberResponse> {
    if (params.partyId && params.userId) {
      const partyMember = this.partyMembers.find((partyMember) => {
        return partyMember.partyId === params.partyId && partyMember.userId === params.userId
      }) ?? null
      
      return { data: partyMember }
    }

    if (params.partyId) {
      const partyMember = this.partyMembers.find((partyMember) => {
        return partyMember.partyId === params.partyId
      }) ?? null

      return { data: partyMember }
    }

    if (params.userId) {
      const partyMember = this.partyMembers.find((partyMember) => {
        return partyMember.userId === params.userId
      }) ?? null

      return { data: partyMember }
    }

    return { data: null }
  }

  async findAll(params: IListPartyMembersParams): Promise<IListPartyMembersResponse> {
    if (params.partyId && params.userId) {
      const partyMembers = this.partyMembers.filter((partyMember) => {
        return partyMember.partyId === params.partyId && partyMember.userId === params.userId
      })

      return { data: partyMembers }
    }

    if (params.partyId) {
      const partyMembers = this.partyMembers.filter((partyMember) => {
        return partyMember.partyId === params.partyId
      })

      return { data: partyMembers }
    }

    if (params.userId) {
      const partyMembers = this.partyMembers.filter((partyMember) => {
        return partyMember.userId === params.userId
      })

      return { data: partyMembers }
    }

    return { data: [] }
  }

  async delete(data: IDeletePartyMemberParams): Promise<void> {
    this.partyMembers = this.partyMembers.filter((partyMember) => {
      return partyMember.partyId !== data.partyId && partyMember.userId !== data.userId
    })
  }

  async deleteAll(params: Pick<IDeletePartyMemberParams, 'partyId'>): Promise<void> {
    this.partyMembers = this.partyMembers.filter((partyMember) => {
      return partyMember.partyId !== params.partyId
    })
  }
}
