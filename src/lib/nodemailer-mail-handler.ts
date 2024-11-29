import { ENV } from '@/env'
import nodemailer from 'nodemailer'
import type { IMailData, IMailHandler } from './@types/email'

export class NodemailerMailHandler implements IMailHandler {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV.MAIL_HOST,
      port: ENV.MAIL_PORT,
      auth: {
        user: ENV.MAIL_USER,
        pass: ENV.MAIL_PASS,
      },
    })
  }

  async sendMail(data: IMailData): Promise<void> {
    const deliveryInfo = await this.transporter.sendMail({
      from: data.from ?? ENV.MAIL_USER,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    })

    console.log('Message sent: %s', deliveryInfo.messageId)
  }
}
