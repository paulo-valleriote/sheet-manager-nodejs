import Fastify from 'fastify'
import { ENV } from '@env'
import { ZodError } from 'zod'

const app = Fastify({
	logger: ENV.NODE_ENV === 'dev',
})

app.get('/', (request, response) => {
	return 'Hello World!'
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
