import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { CreateSheetUseCase } from '../create'

export function makeCreateSheetUseCase() {
  const sheetsRepository = new InMemorySheetRepository()

  return new CreateSheetUseCase(sheetsRepository)
}
