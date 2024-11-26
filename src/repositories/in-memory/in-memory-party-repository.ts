import { randomUUID } from 'node:crypto'
import type { IParty } from '@/domain/entities/party'
import type { IPartiesRepository } from '@/repositories/parties-repository'
import type {
  ICreatePartyParams,
  IDeletePartyParams,
  IGetPartyParams,
  IListPartiesParams,
  IUpdatePartyParams,
} from '../@types/parties'

export class InMemoryPartyRepository implements IPartiesRepository {
  public data: IParty[] = []

  async create(data: ICreatePartyParams) {
    this.data.push({
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    })
  }

  async findByPartyId(params: Pick<IGetPartyParams, 'partyId' | 'dungeonMasterId'>) {
    return this.data.find((party) => party.id === params.partyId && party.dungeonMasterId === params.dungeonMasterId) ?? null
  }

  async findAllByDungeonMasterId(params: Pick<IGetPartyParams, 'dungeonMasterId'>) {
    return this.data.filter((party) => party.dungeonMasterId === params.dungeonMasterId)
  }
  
  async findAll(params: IListPartiesParams) {
    return this.data.filter((party) => party.dungeonMasterId === params.dungeonMasterId)
  }
  async update(params: IUpdatePartyParams, id: string) {
    const partyIndex = this.data.findIndex((party) => party.id === id)
    this.data[partyIndex] = { ...this.data[partyIndex], ...params }
  }

  async delete(params: Pick<IDeletePartyParams, 'partyId' | 'dungeonMasterId'>) {
    const partyIndex = this.data.findIndex((party) => party.id === params.partyId)
    this.data.splice(partyIndex, 1)
  }
}
