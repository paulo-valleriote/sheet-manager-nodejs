import 'dotenv/config'
import { z } from 'zod'

const envBodySchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  //CACHE_DB_URL: z.string().url(),
  JWT_SECRET: z.string(),
})

const parsedEnv = envBodySchema.safeParse(process.env)

if (parsedEnv.success === false) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format())
  throw new Error('Invalid environment variables.')
}

/**
 * Environment variables
 * @description Constant that contains all validated environment variables of the application
 */
export const ENV = parsedEnv.data
