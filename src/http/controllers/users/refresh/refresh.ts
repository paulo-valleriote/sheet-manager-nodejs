import { FastifyJwtHandler } from '@/lib/fastify-jwt-handler'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const jwtHandler = new FastifyJwtHandler()
  const { token, refreshToken } = await jwtHandler.sign({
    payload: {
      role: request.user.role,
    },
    reply,
    signSub: request.user.sub,
    refreshToken: true,
  })

  if (!refreshToken) {
    return reply.status(200).send({ token })
  }

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({ token })
}
