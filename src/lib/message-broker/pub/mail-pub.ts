import type { IPublisher } from '@/lib/@types/queue'
import type { Publisher } from 'rabbitmq-client'
import type { RabbitMQSetup } from '../rabbitmq-setup'

export class MailPub implements IPublisher {
  constructor(private readonly rabbitMq: RabbitMQSetup) {}

  make(): Publisher {
    const KEY = 'mail-queue'
    return this.rabbitMq.createPublisher(KEY)
  }
}
