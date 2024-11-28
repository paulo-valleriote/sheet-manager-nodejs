import type {
  ICreatePartyMemberParams,
  IDeletePartyMemberParams,
  IGetPartyMemberParams,
  IGetPartyMemberResponse,
  IListPartyMembersParams,
  IListPartyMembersResponse,
  IUpdatePartyMemberParams,
} from '@/repositories/@types/party-members'

export interface IPartyMembersRepository {
  create(data: ICreatePartyMemberParams): Promise<void>
  findBy(params: Partial<IGetPartyMemberParams>): Promise<IGetPartyMemberResponse>
  findAll(params: IListPartyMembersParams): Promise<IListPartyMembersResponse>
  update(data: IUpdatePartyMemberParams): Promise<void>
  delete(data: IDeletePartyMemberParams): Promise<void>
  deleteAll(params: Pick<IDeletePartyMemberParams, 'partyId'>): Promise<void>
}
