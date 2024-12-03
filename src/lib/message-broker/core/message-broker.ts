import type { IMessageBroker } from '@/lib/@types/queue'

export abstract class MessageBroker<T, SUB, PUB, PUB_PROPS, SUB_CB> implements IMessageBroker {
  protected APP_QUEUES = ['mail-queue']
  protected createdSubscribers: Map<string, SUB> = new Map()
  protected createdPublishers: Map<string, PUB> = new Map()

  abstract setup(): Promise<T>
  abstract onShutdown(): Promise<void>
  abstract createPublisher(queue: string, publisherProps?: PUB_PROPS): PUB
  abstract createSubscriber(queue: string, routingKey: string, callback: SUB_CB, errorCallback?: (error: Error) => void): SUB

  getPublisher(exchange: string): PUB | undefined {
    return this.createdPublishers.get(exchange)
  }

  getSubscriber(queue: string): SUB | undefined {
    return this.createdSubscribers.get(queue)
  }

  listQueues() {
    const queues = []

    for (const queue of this.createdSubscribers.keys()) {
      queues.push(queue)
    }

    return queues
  }
}
