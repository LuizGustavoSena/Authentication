require('dotenv/config');
import { z } from "zod";
import { InvalidEnvError } from "../../domain/error/invalid-env";

const schema = z.object({
    DATABASE_URL: z.string(),
    SECRET_KEY_TOKEN: z.string(),
    EXPIRES_TOKEN_MILLISECONDS: z.coerce.number(),
    SECRET_KEY_ENCRYPT: z.string(),
    SECRET_IV_ENCRYPT: z.string(),
    URLS_ENABLE_CORS: z.array(z.string()),
    NODE_ENV: z.enum(['dev', 'test', 'prd']),
    URL_WEB_SITE: z.string(),
    PORT: z.coerce.number().default(3000),
});

const _env = schema.safeParse({
    ...process.env,
    URLS_ENABLE_CORS: process.env.URLS_ENABLE_CORS?.split(',') ?? []
});

if (!_env.success) {
    const formattedError = (_env as typeof _env & { success: false }).error.format();
    throw new InvalidEnvError(JSON.stringify(formattedError));
}

export const env = _env.data;