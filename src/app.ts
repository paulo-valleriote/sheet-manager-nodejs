import { ENV } from '@env'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { ZodError } from 'zod'
import { partiesRoutes } from './http/controllers/parties/routes'
import { ROUTE } from './http/controllers/routes.index'
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
/*app.register(fastifyRedis, {
  url: ENV.CACHE_DB_URL,
  closeClient: true
})*/

// Routes
app.get('/', () => {
  return { message: 'Hello World! Welcome to "The Sheet Ledger" API.', routes: ROUTE }
})

app.register(userRoutes, {
  prefix: ROUTE.usersAndAuthentication,
})
app.register(sheetsRoutes, {
  prefix: ROUTE.sheets,
})
app.register(sheetTemplatesRoutes, {
  prefix: ROUTE.sheetTemplates,
})
app.register(partiesRoutes, {
  prefix: ROUTE.parties,
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
