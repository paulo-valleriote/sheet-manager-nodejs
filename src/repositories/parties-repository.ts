import type {
  ICreatePartyParams,
  ICreatePartyResponse,
  IDeletePartyParams,
  IGetPartyParams,
  IGetPartyResponse,
  IListPartiesParams,
  IListPartiesResponse,
  IUpdatePartyParams,
} from '@/repositories/@types/parties'

export interface IPartiesRepository {
  create(data: ICreatePartyParams): Promise<ICreatePartyResponse>
  findAll(params: IListPartiesParams): Promise<IListPartiesResponse>
  findById(params: Pick<IGetPartyParams, 'partyId'>): Promise<IGetPartyResponse>
  findAllByDungeonMasterId(params: Pick<IGetPartyParams, 'dungeonMasterId'>): Promise<IListPartiesResponse>
  update(params: IUpdatePartyParams, id: string): Promise<void>
  delete(params: Pick<IDeletePartyParams, 'partyId'>): Promise<void>
}
