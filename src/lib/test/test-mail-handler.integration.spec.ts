import { describe, expect, it } from 'vitest'
import type { IMailData } from '../@types/email'
import { TestMailHandler } from './test-mail-handler'

describe('TestMailHandler', () => {
  it('should be able to send a mail', async () => {
    const mailHandler = new TestMailHandler()

    const mailData: IMailData = {
      to: 'test@test.com',
      subject: 'Test',
      text: 'Integration test to nodemailer',
    }

    await expect(mailHandler.sendMail(mailData)).resolves.not.toThrow()
  })
})
