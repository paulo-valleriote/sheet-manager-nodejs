export class ResourceNotFoundError extends Error {
  constructor(message?: string) {
    const defaultMessage = 'Resource not found'

    if (message !== undefined) {
      super(`${defaultMessage}, ${message}`)
    } else {
      super(defaultMessage)
    }
  }
}
