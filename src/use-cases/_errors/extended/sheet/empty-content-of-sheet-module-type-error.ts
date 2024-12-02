import { BadRequestError } from "../../core/bad-request-error";

export class EmptyContentOfSheetModuleTypeError extends BadRequestError {
  constructor() {
    super('Content must be provided and match the data schema of expected type')
  }
}
