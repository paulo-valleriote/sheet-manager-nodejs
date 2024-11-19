import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { FastifyJwtHandler } from "@/lib/fastify-jwt-handler";
import { makeAuthenticateUserUseCase } from "@/use-cases/users/_factories/make-authenticate-user-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const jwtHandler = new FastifyJwtHandler()
  const {token, refreshToken} = await jwtHandler.sign({
    reply,
    signSub: request.user.sub,
  })

  if (!refreshToken) {
    return reply
      .status(200)
      .send({ token })
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