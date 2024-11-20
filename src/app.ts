import { ENV } from '@env'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { ZodError } from 'zod'
import { sheetTemplatesRoutes } from './http/controllers/sheet-templates/routes'
import { sheetsRoutes } from './http/controllers/sheets/routes'
import { userRoutes } from './http/controllers/users/routes'

// App Configuration
const app = Fastify({
  logger: ENV.NODE_ENV === 'dev',
})

// Plugins
app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: ENV.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Routes
app.register(userRoutes)
app.register(sheetsRoutes, {
  prefix: '/users/:userId/sheets',
})
app.register(sheetTemplatesRoutes, {
  prefix: '/sheets/templates',
})

// Global error handler
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
  }

  if (ENV.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

export default app
