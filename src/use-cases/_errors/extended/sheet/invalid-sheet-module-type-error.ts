import { BadRequestError } from "../../core/bad-request-error";

export class InvalidSheetModuleTypeError extends BadRequestError {
  constructor() {
    super('Invalid sheet module type')
  }
}
