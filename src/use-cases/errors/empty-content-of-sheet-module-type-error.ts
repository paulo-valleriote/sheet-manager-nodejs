export class EmptyContentOfSheetModuleTypeError extends Error {
  constructor() {
    super('Content must be provided and match the data schema of expected type')
  }
}
