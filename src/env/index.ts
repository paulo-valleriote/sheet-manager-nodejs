import 'dotenv/config'
import { z } from 'zod'

const envBodySchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  //CACHE_DB_URL: z.string().url(),
  JWT_SECRET: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_IS_SECURE: z.coerce.boolean(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_TEST_HOST: z.string().optional(),
  MAIL_TEST_PORT: z.coerce.number().optional(),
  MAIL_TEST_IS_SECURE: z.coerce.boolean().optional(),
  MAIL_TEST_USER: z.string().optional(),
  MAIL_TEST_PASS: z.string().optional(),
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
