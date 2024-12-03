import type { Publisher } from 'rabbitmq-client'
import type { IQueueHandler } from '../@types/queue'

export class QueueHandler implements IQueueHandler {
  constructor(private readonly rabbitMq: Publisher) {}

  async sendMessage(queue: string, message: string) {
    this.rabbitMq.send(queue, message)
  }
}
