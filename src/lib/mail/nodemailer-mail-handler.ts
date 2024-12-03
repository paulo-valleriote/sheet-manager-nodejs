import { ENV } from '@/env'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import type { IMailData, IMailHandler } from '../@types/email'
import type { IZodParse } from '../@types/zod'

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

  validate(data: string): IZodParse<IMailData> {
    const mailSchema = z.object({
      from: z.string().optional(),
      to: z.string(),
      subject: z.string(),
      text: z.string().optional(),
      html: z.string().optional(),
    })

    const parsedData = mailSchema.safeParse(JSON.parse(data))

    if (parsedData.success) {
      return {
        data: parsedData.data,
        error: false,
      }
    }

    return {
      data: null,
      error: true,
    }
  }
}
