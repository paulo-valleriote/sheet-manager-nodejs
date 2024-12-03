import type { InMemoryMessageBroker } from './in-memory-message-broker'

export class InMemoryQueueSubscriber {
  constructor(private readonly messageBroker: InMemoryMessageBroker) {}

  make() {
    return this.messageBroker.createSubscriber('test-queue', 'test-routing-key', {
      callback: () => {},
    })
  }

  close() {
    return Promise.resolve()
  }
}
