import "dotenv/config"
import { z } from "zod";

const envBodySchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
})

const parsedEnv = envBodySchema.safeParse(process.env)

if (parsedEnv.success === false) {
  console.error("❌ Invalid environment variables", parsedEnv.error.format())
  throw new Error("Invalid environment variables.")
}

export const ENV = parsedEnv.data
