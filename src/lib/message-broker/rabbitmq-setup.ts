import { ENV } from '@/env'
import Connection, { type ConsumerHandler, type Consumer, type Publisher, type PublisherProps } from 'rabbitmq-client'
import { MessageBroker } from './core/message-broker'

export class RabbitMQSetup extends MessageBroker<Connection, Consumer, Publisher, PublisherProps, ConsumerHandler>   {
  private static instance?: RabbitMQSetup | null = null
  private rabbitmq: Connection

  private constructor() {
    super()
    this.rabbitmq = new Connection(ENV.RABBITMQ_URL)
  }

  static getInstance(): RabbitMQSetup {
    if (!RabbitMQSetup.instance) {
      RabbitMQSetup.instance = new RabbitMQSetup()
    }
    return RabbitMQSetup.instance
  }

  async setup() {
    this.rabbitmq.on('error', (error) => {
      console.error('RabbitMQ error:', error)
    })

    this.rabbitmq.on('connection', () => {
      console.log('RabbitMQ connection established')
    })

    for (const queue of this.APP_QUEUES) {
      this.rabbitmq.queueDeclare(queue)
    }

    return this.rabbitmq
  }

  async onShutdown() {
    for (const publisher of this.createdPublishers.values()) {
      await publisher.close()
    }

    for (const consumer of this.createdSubscribers.values()) {
      await consumer.close()
    }

    await this.rabbitmq.close()
  }

  createPublisher(queue: string, publisherProps?: Omit<PublisherProps, 'exchanges'>): Publisher {
    const pubExists = this.getPublisher(queue)
    if (pubExists) {
      return pubExists
    }

    const pub = this.rabbitmq.createPublisher({
      confirm: true,
      maxAttempts: 2,
      queues: [{ queue }],
      ...publisherProps,
    })

    this.createdPublishers.set(queue, pub)
    return pub
  }

  createSubscriber(
    queue: string,
    routingKey: string,
    callback: ConsumerHandler,
    errorCallback?: (error: Error) => void,
  ) {
    const subExists = this.getSubscriber(queue)
    if (subExists) {
      return subExists
    }

    const sub = this.rabbitmq.createConsumer({ queue, queueBindings: [{ exchange: queue, routingKey }] }, callback)

    const defaultErrorCallback = (error: Error) => {
      console.error('RabbitMQ error:', error)
    }
    if (errorCallback !== undefined) {
      sub.on('error', errorCallback)
    } else {
      sub.on('error', defaultErrorCallback)
    }

    this.createdSubscribers.set(queue, sub)
    return sub
  }
}
