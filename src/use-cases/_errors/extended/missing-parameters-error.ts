import { BadRequestError } from "../core/bad-request-error"

/**
 * @description Error thrown when a required parameter is missing
 * @example
 * throw new MissingParametersError('Party invite id is required') // 'Missing parameters, id is required'
 * throw new MissingParametersError() // 'Missing parameters'
 */
export class MissingParametersError extends BadRequestError {
  constructor(additionalMessage?: string) {
    const defaultMessage = 'Missing parameters'

    if (additionalMessage !== undefined) {
      super(`${defaultMessage}, ${additionalMessage}`)
    } else {
      super(defaultMessage)
    }
  }
}
