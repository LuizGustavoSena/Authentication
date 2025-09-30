require('dotenv/config');
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { InvalidEnvError } from "../../domain/error/invalid-env";

const tstSchema = z.object({
    DATABASE_URL: z.string().default(faker.internet.url()),
    SECRET_KEY_TOKEN: z.string().default(faker.string.uuid()),
    EXPIRES_TOKEN_MILLISECONDS: z.coerce.number().default(99999),
    SECRET_KEY_ENCRYPT: z.string().default(faker.string.uuid()),
    SECRET_IV_ENCRYPT: z.string().default(faker.string.uuid()),
    URL_API_AUTHENTICATION: z.string().default(faker.internet.url()),
    MINUTES_REQUEST: z.coerce.number().default(faker.number.int()),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    URL_WEB_SITE: z.string().default(faker.internet.url()),
    PORT: z.coerce.number().default(3000),
});

const prdSchema = z.object({
    DATABASE_URL: z.string(),
    SECRET_KEY_TOKEN: z.string(),
    EXPIRES_TOKEN_MILLISECONDS: z.coerce.number(),
    SECRET_KEY_ENCRYPT: z.string(),
    SECRET_IV_ENCRYPT: z.string(),
    URL_API_AUTHENTICATION: z.string(),
    MINUTES_REQUEST: z.coerce.number(),
    NODE_ENV: z.enum(['dev', 'tst', 'prd']),
    URL_WEB_SITE: z.string(),
    PORT: z.coerce.number().default(3000),
});

const schema = process.env.NODE_ENV === "test" ? tstSchema : prdSchema;

const _env = schema.safeParse(process.env);

if (!_env.success) {
    const formattedError = (_env as typeof _env & { success: false }).error.format();
    throw new InvalidEnvError(JSON.stringify(formattedError));
}

export const env = _env.data;