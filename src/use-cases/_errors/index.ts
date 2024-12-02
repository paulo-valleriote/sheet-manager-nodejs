import { BadRequestError } from "./core/bad-request-error"
import { ForbiddenError } from "./core/forbidden-error"
import { ResourceNotFoundError } from "./core/resource-not-found-error"
import { UnauthorizedError } from "./core/unauthorized-error"

const APP_ERRORS = {
  BadRequestError,
  ForbiddenError,
  ResourceNotFoundError,
  UnauthorizedError
}

export { APP_ERRORS }
