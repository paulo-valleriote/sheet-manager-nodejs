import type { FastifyReply } from 'fastify'

/**
 * Fastify JWT handler
 * @description This class is responsible for signing and refreshing JWT tokens
 */
export class FastifyJwtHandler {
  async sign({ reply, signSub, payload, refreshToken, expiresIn }: JwtSignPayload): Promise<JwtSignResponse> {
    const token = await reply.jwtSign(payload ?? {}, {
      sign: {
        sub: signSub,
      },
    })

    if (refreshToken) {
      const refreshToken = await reply.jwtSign(payload ?? {}, {
        sign: {
          sub: signSub,
          expiresIn: expiresIn ?? '7d',
        },
      })

      return { token, refreshToken }
    }

    return { token, refreshToken: null }
  }
}

interface JwtSignPayload {
  reply: FastifyReply
  signSub: string
  payload?: Record<string, unknown>
  refreshToken?: boolean
  expiresIn?: string
}

interface JwtSignResponse {
  token: string | null
  refreshToken: string | null
}
