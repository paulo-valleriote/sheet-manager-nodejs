import type { IPartyMember } from '@/domain/entities/party-member'
import type { Optional } from '@/domain/types/optional'

interface IPartyMemberReadonlyOperationParams {
  partyId: string
  userId: string
}

interface IGetPartyMemberParams extends Pick<IPartyMemberReadonlyOperationParams, 'userId' | 'partyId'> {}
interface IListPartyMembersParams extends Optional<IPartyMemberReadonlyOperationParams, 'partyId' | 'userId'> {}

interface ICreatePartyMemberParams extends Optional<IPartyMember, 'id' | 'createdAt' | 'updatedAt'> {
  role: IPartyRoles
  userId: string
  partyId: string
}

interface IUpdatePartyMemberParams extends Omit<IPartyMemberReadonlyOperationParams, 'partyId'> {
  role?: IPartyRoles
}

interface IDeletePartyMemberParams extends IPartyMemberReadonlyOperationParams {}

interface IGetPartyMemberResponse {
  data: IPartyMember | null
}

interface IListPartyMembersResponse {
  data: IPartyMember[]
}

export type {
  IGetPartyMemberParams,
  IGetPartyMemberResponse,
  IListPartyMembersParams,
  IListPartyMembersResponse,
  ICreatePartyMemberParams,
  IUpdatePartyMemberParams,
  IDeletePartyMemberParams,
}
