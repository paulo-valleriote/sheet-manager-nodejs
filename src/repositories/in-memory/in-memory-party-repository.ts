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
      id: data.id ?? randomUUID(),
      createdAt: new Date(),
    })

    return { data: { id: this.data[this.data.length - 1].id } }
  }

  async findById(params: Pick<IGetPartyParams, 'partyId'>) {
    const party = this.data.find((party) => party.id === params.partyId) ?? null
    return { data: party }
  }

  async findAllByDungeonMasterId(params: Pick<IGetPartyParams, 'dungeonMasterId'>) {
    const parties = this.data.filter((party) => party.dungeonMasterId === params.dungeonMasterId)
    return { data: parties }
  }
  
  async findAll(params: IListPartiesParams) {
    const parties = this.data.filter((party) => party.dungeonMasterId === params.dungeonMasterId)
    return { data: parties }
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
