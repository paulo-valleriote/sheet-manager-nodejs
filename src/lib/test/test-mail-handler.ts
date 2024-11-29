import { ENV } from '@/env'
import nodemailer from 'nodemailer'
import type { IMailData, IMailHandler } from '../@types/email'

export class TestMailHandler implements IMailHandler {
  private transporter: nodemailer.Transporter

  constructor() {
    if (!ENV.MAIL_TEST_HOST || !ENV.MAIL_TEST_PORT || !ENV.MAIL_TEST_IS_SECURE || !ENV.MAIL_TEST_USER || !ENV.MAIL_TEST_PASS) {
      throw new Error('Cannot test mail handler without test mail environment variables')
    }

    this.transporter = nodemailer.createTransport({
      host: ENV.MAIL_TEST_HOST,
      port: ENV.MAIL_TEST_PORT,
      auth: {
        user: ENV.MAIL_TEST_USER,
        pass: ENV.MAIL_TEST_PASS,
      },
    })
  }

  async sendMail(data: IMailData): Promise<void> {
    const deliveryInfo = await this.transporter.sendMail({
      from: data.from ?? ENV.MAIL_TEST_USER,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    })

    console.log('Message sent: %s', deliveryInfo.messageId)
  }
}
