require('dotenv/config');
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { InvalidEnvError } from "../../domain/error/invalid-env";

const schema = z.object({
    DATABASE_URL: z.string().default(faker.internet.url()),
    SECRET_KEY_TOKEN: z.string().default(faker.string.uuid()),
    EXPIRES_TOKEN_MILLISECONDS: z.coerce.number().default(99999),
    SECRET_KEY_ENCRYPT: z.string().default(faker.string.uuid()),
    SECRET_IV_ENCRYPT: z.string().default(faker.string.uuid()),
    URLS_ENABLE_CORS: z.array(z.string()),
    NODE_ENV: z.enum(['dev', 'tst', 'prd']),
    URL_WEB_SITE: z.string().default(faker.internet.url()),
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