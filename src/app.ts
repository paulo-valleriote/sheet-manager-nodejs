import Fastify from "fastify";

const app = Fastify()

app.get('/', (request, response) => {
  return 'Hello World!'
})

export default app
