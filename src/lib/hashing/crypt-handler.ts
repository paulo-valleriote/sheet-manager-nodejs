import type { ICryptHandler } from '@/lib/@types/crypt'
import bcrypt from 'bcryptjs'

/**
 * Crypt handler
 * @description This class is responsible for hashing and comparing passwords
 */
export class CryptHandler implements ICryptHandler {
  async hash(password: string) {
    return bcrypt.hash(password, 10)
  }

  compare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }
}
