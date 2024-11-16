import app from './app'
import { ENV } from '@env'

try {
  app.listen({ port: ENV.PORT }, () => {
    console.log(`Server is running on port ${ENV.PORT}`)
  })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
