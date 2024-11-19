import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { UpdateSheetUseCase } from '../update'

export function makeUpdateSheetUseCase() {
  const sheetsRepository = new InMemorySheetRepository()

  return new UpdateSheetUseCase(sheetsRepository)
}
