import bcrypt from 'bcryptjs'
import type { ICryptHandler } from '@/lib/@types/crypt'

export class CryptHandler implements ICryptHandler {
  async hash(password: string) {
    return bcrypt.hash(password, 10)
  }

  compare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }
}
