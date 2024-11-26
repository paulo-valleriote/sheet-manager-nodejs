import type { IParty } from '@/domain/entities/party'
import type { ICreatePartyParams, IDeletePartyParams, IGetPartyParams, IListPartiesParams, IUpdatePartyParams } from '@/repositories/@types/parties'

export interface IPartiesRepository {
  create(data: ICreatePartyParams): Promise<void>
  findAll(params: IListPartiesParams): Promise<IParty[]>
  findByPartyId(params: Pick<IGetPartyParams, 'partyId'>): Promise<IParty | null>
  findByDungeonMasterId(params: Pick<IGetPartyParams, 'dungeonMasterId'>): Promise<IParty | null>
  update(params: IUpdatePartyParams, id: string): Promise<void>
  delete(params: Pick<IDeletePartyParams, 'partyId'>): Promise<void>
}
