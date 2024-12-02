import { BadRequestError } from "../../core/bad-request-error";

export class PartyAlreadyFullError extends BadRequestError {
  constructor() {
    super('Party already full')
  }
}
