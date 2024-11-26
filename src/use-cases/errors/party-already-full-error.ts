export class PartyAlreadyFullError extends Error {
  constructor() {
    super("Party already full");
  }
}
