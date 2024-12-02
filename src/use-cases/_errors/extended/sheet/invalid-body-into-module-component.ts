import type { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import { BadRequestError } from '../../core/bad-request-error'

export class InvalidBodyIntoModuleComponentError extends BadRequestError {
  constructor(componentType: ISheetModuleTypes) {
    super(`Body informations are invalid for "${componentType}" component type`)
  }
}
