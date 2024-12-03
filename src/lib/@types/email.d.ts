import type { IZodParse } from './zod'

export interface IMailData {
  from?: string
  to: string
  subject: string
  text?: string
  html?: string
}

export interface IMailHandler {
  sendMail(data: IMailData): Promise<void>
  validate(data: string): IZodParse<IMailData>
}
