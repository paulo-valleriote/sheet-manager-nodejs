import { BadRequestError } from "../../core/bad-request-error";

export class UserAlreadyExistsError extends BadRequestError {
  constructor() {
    super('User already exists')
  }
}
