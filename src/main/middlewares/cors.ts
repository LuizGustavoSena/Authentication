import cors from 'cors';
import { env } from '../../infra/zod/env';

const corsOptionsDelegate = {
    origin: env.URLS_ENABLE_CORS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

export const configurationCors = cors(corsOptionsDelegate);