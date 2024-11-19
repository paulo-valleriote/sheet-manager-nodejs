import { InMemorySheetRepository } from '@/repositories/in-memory/in-memory-sheet-repository'
import { DeleteSheetUseCase } from '../delete'

export function makeDeleteSheetUseCase() {
  const sheetsRepository = new InMemorySheetRepository()

  return new DeleteSheetUseCase(sheetsRepository)
}
