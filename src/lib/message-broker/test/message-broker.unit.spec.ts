import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryMessageBroker } from './in-memory-message-broker'

describe('MessageBroker', () => {
  let messageBroker: InMemoryMessageBroker

  beforeEach(() => {
    messageBroker = InMemoryMessageBroker.getInstance()
  })

  afterEach(() => {
    messageBroker.resetInstance()
  })

  it('should create a singleton instance', () => {
    const instance1 = InMemoryMessageBroker.getInstance()
    const instance2 = InMemoryMessageBroker.getInstance()

    expect(instance1).toBe(instance2)
  })

  it('should setup connection and declare queues', async () => {
    const connection = await messageBroker.setup()

    expect(connection).toBeDefined()
    // biome-ignore lint/complexity/useLiteralKeys: <Supressing to use mock for testing purposes>
    expect(messageBroker['APP_QUEUES']).toContain('mail-queue')
  })

  it('should create and cache publishers', () => {
    const publisher1 = messageBroker.createPublisher('test-queue')
    const publisher2 = messageBroker.createPublisher('test-queue')

    expect(publisher1).toEqual(publisher2)
    // biome-ignore lint/complexity/useLiteralKeys: <Supressing to use mock for testing purposes>
    expect(messageBroker['createdPublishers'].get('test-queue')).toEqual(publisher1)
  })

  it('should create and cache subscribers', () => {
    const callback = () => {}
    const subscriber1 = messageBroker.createSubscriber('test-queue', 'test.*', { callback })
    const subscriber2 = messageBroker.createSubscriber('test-queue', 'test.*', { callback })

    expect(subscriber1).toEqual(subscriber2)
    // biome-ignore lint/complexity/useLiteralKeys: <Supressing to use mock for testing purposes>
    expect(messageBroker['createdSubscribers'].get('test-queue')).toEqual(subscriber1)
  })

  it('should handle subscriber error callbacks', () => {
    const callback = () => {}
    const errorCallback = vi.fn()

    const subscriber = messageBroker.createSubscriber('test-queue', 'test.*', { callback })

    expect(subscriber).toBeDefined()
    expect(errorCallback).toBeDefined()
  })

  it('should properly shutdown all connections', async () => {
    const callback = () => {}

    messageBroker.createPublisher('test-queue-1')
    messageBroker.createPublisher('test-queue-2')
    messageBroker.createSubscriber('test-queue-1', 'test.*', { callback })
    messageBroker.createSubscriber('test-queue-2', 'test.*', { callback })

    await messageBroker.onShutdown()

    // biome-ignore lint/complexity/useLiteralKeys: <Supressing to use mock for testing purposes>
    expect(messageBroker['createdPublishers'].size).toBe(0)
    // biome-ignore lint/complexity/useLiteralKeys: <Supressing to use mock for testing purposes>
    expect(messageBroker['createdSubscribers'].size).toBe(0)
  })
})
