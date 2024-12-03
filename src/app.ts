import { ENV } from '@env'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { GlobalErrorHandler } from './global-error-handler'
import { partiesRoutes } from './http/controllers/parties/routes'
import { ROUTE } from './http/controllers/routes.index'
import { sheetTemplatesRoutes } from './http/controllers/sheet-templates/routes'
import { sheetsRoutes } from './http/controllers/sheets/routes'
import { userRoutes } from './http/controllers/users/routes'
import { RabbitMQSetup } from './lib/message-broker/rabbitmq-setup'

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

const rabbitMQSetup = RabbitMQSetup.getInstance()
rabbitMQSetup.setup()

process.on('SIGINT', rabbitMQSetup.onShutdown)
process.on('SIGTERM', rabbitMQSetup.onShutdown)


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
app.setErrorHandler(new GlobalErrorHandler().handle)

export default app
