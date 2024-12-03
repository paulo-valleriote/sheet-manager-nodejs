export class InMemoryQueueConnection {
  private queues: Map<string, string[]> = new Map()

  on(event: 'error' | 'connection', callback: (...args: string[]) => void) {
    return callback
  }

  queueDeclare(queue: string) {
    this.queues.set(queue, [])
  }

  createPublisher(queue: string) {
    return null
  }

  createSubscriber(queue: string) {
    return null
  }

  close() {
    return Promise.resolve()
  }
}
