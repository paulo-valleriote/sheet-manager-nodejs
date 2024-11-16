import Fastify from "fastify";
import { ENV } from "@env";

const app = Fastify({
  logger: ENV.NODE_ENV === 'dev'
})

app.get('/', (request, response) => {
  return 'Hello World!'
})

export default app
