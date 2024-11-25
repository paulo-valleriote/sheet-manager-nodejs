import type { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'

export class InvalidBodyIntoModuleComponentError extends Error {
  constructor(componentType: ISheetModuleTypes) {
    super(`Body informations are invalid for "${componentType}" component type`)
  }
}
