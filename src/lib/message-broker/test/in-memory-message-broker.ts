import { MessageBroker } from '../core/message-broker'
import { InMemoryQueueConnection } from './in-memory-queue-connection'
import { InMemoryQueuePublisher } from './in-memory-queue-publisher'
import { InMemoryQueueSubscriber } from './in-memory-queue-subscriber'

interface PublisherProps {
  queue: string
}

interface ConsumerHandler {
  callback: (message: string) => void
}

export class InMemoryMessageBroker extends MessageBroker<
  InMemoryQueueConnection,
  InMemoryQueueSubscriber,
  InMemoryQueuePublisher,
  PublisherProps,
  ConsumerHandler
> {
  private static instance?: InMemoryMessageBroker | null = null
  private testConnection: InMemoryQueueConnection

  private constructor() {
    super()
    this.testConnection = new InMemoryQueueConnection()
  }

  static getInstance(): InMemoryMessageBroker {
    if (!InMemoryMessageBroker.instance) {
      InMemoryMessageBroker.instance = new InMemoryMessageBroker()
    }
    return InMemoryMessageBroker.instance
  }

  setup(): Promise<InMemoryQueueConnection> {
    return Promise.resolve(this.testConnection)
  }

  onShutdown(): Promise<void> {
    this.resetInstance()
    return Promise.resolve()
  }

  createPublisher(queue: string, publisherProps?: PublisherProps): InMemoryQueuePublisher {
    this.createdPublishers.set(queue, new InMemoryQueuePublisher(this))
    return new InMemoryQueuePublisher(this)
  }

  createSubscriber(queue: string, routingKey: string, callback: ConsumerHandler): InMemoryQueueSubscriber {
    this.createdSubscribers.set(queue, new InMemoryQueueSubscriber(this))
    return new InMemoryQueueSubscriber(this)
  }

  resetInstance() {
    InMemoryMessageBroker.instance = null
    this.createdPublishers.clear()
    this.createdSubscribers.clear()
  }
}
