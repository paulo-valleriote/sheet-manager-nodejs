import type { IMailHandler } from '@/lib/@types/email'
import type { ISubscriber } from '@/lib/@types/queue'
import type { RabbitMQSetup } from '../rabbitmq-setup'

export class MailSub implements ISubscriber {
  constructor(
    private readonly rabbitMq: RabbitMQSetup,
    private readonly mailService: IMailHandler,
  ) {}

  make() {
    return this.rabbitMq.createSubscriber('mail-queue', 'mail.*', (message) => {
      this.callback(message.body)
    })
  }

  private parseMessage(message: string) {
    return this.mailService.validate(JSON.parse(message))
  }

  private callback(message: string) {
    const parsedMessage = this.parseMessage(message)

    if (parsedMessage.error) {
      console.error('Invalid message:', parsedMessage)
      console.error('E-mail not sent')
      return
    }

    if (!parsedMessage.data) {
      console.error('Message data is null')
      console.error('E-mail not sent')
      return
    }

    this.mailService.sendMail(parsedMessage.data)
  }
}
