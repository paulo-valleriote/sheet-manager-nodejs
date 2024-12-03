import type { InMemoryMessageBroker } from "./in-memory-message-broker";

export class InMemoryQueuePublisher {
  constructor(private readonly messageBroker: InMemoryMessageBroker) {}

  make() {
    return this.messageBroker.createPublisher('test-queue')
  }

  close() {
    return Promise.resolve()
  }
}