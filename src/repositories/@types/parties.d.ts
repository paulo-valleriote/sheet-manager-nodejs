import type { IParty } from '@/domain/entities/party'
import type { Optional } from '@/domain/types/optional'

interface IPartyReadonlyOperationParams {
  partyId: string
  dungeonMasterId: string
  playerIds: string[]
}

interface IGetPartyParams extends IPartyReadonlyOperationParams {}
interface IListPartiesParams extends Pick<IPartyReadonlyOperationParams, 'dungeonMasterId'> {}

interface ICreatePartyParams extends Optional<IParty, 'id' | 'createdAt' | 'updatedAt'> {}

interface IUpdatePartyParams extends Omit<IPartyReadonlyOperationParams, 'partyId'> {
  id: string
}

interface IDeletePartyParams extends IPartyReadonlyOperationParams {}

interface IGetPartyResponse {
  data: IParty | null
}

interface IListPartiesResponse {
  data: IParty[]
}

export type {
  IGetPartyParams,
  IGetPartyResponse,
  IListPartiesParams,
  IListPartiesResponse,
  ICreatePartyParams,
  IUpdatePartyParams,
  IDeletePartyParams,
}
