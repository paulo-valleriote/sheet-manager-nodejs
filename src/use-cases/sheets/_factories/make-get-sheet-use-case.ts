import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { GetSheetUseCase } from '../get'

export function makeGetSheetUseCase() {
  const sheetsRepository = new InMemorySheetRepository()

  return new GetSheetUseCase(sheetsRepository)
}
