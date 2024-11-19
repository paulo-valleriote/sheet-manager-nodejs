import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { ListSheetUseCase } from '../list'

export function makeListSheetUseCase() {
  const sheetsRepository = new InMemorySheetRepository()

  return new ListSheetUseCase(sheetsRepository)
}
