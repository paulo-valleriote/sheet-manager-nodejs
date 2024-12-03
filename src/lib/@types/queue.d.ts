export interface IMessageBroker {
  setup(): Promise<T>
  onShutdown(): Promise<void>
  getPublisher(exchange: string): Publisher | undefined
  getSubscriber(queue: string): Consumer | undefined
  createPublisher(queue: string, publisherProps?: PUB_PROPS): PUB
  createSubscriber(queue: string, routingKey: string, callback: SUB_CB, errorCallback?: (error: Error) => void): SUB
  listQueues(): string[]
}

export interface IPublisher {
  make(): Publisher
}

export interface ISubscriber {
  make(): Subscriber
}

export interface IQueueHandler {
  sendMessage(queue: string, message: string): Promise<void>
}
