import { UnauthorizedError } from "../../core/unauthorized-error";

export class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('Invalid credentials')
  }
}
