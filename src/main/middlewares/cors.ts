import cors from 'cors';
import { env } from '../../infra/zod/env';

const corsOptionsDelegate = function (req: any, callback: Function) {
    const allowlist = env.URLS_ENABLE_CORS;
    const corsOptions = { origin: false };

    if (env.NODE_ENV !== 'production') return callback(null, corsOptions)

    if (allowlist.indexOf(req.header('Origin')) !== -1)
        corsOptions.origin = true;

    callback(null, corsOptions);
}

export const configurationCors = cors(corsOptionsDelegate);