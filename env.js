// @ts-check
const { z } = require("zod");

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(
    `環境変数の設定が間違っています:
    ${JSON.stringify(process.env)},
    ${JSON.stringify(env.error.format(), null, 4)}`
  );
}
module.exports.env = env.data;
