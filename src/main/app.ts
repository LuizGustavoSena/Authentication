import express from 'express';
import helmet from 'helmet';
import { checkContentLength } from './middlewares/content-length';
import { configurationCors } from './middlewares/cors';
import { errorHandler } from './middlewares/error-handler';
import { rateLimiter } from './middlewares/rate-limit';
import { tooBusyCheck } from './middlewares/too-busy-check';
import AuthRouter from './routes/auth-route';
import TokenRouter from './routes/token-route';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(tooBusyCheck);
app.use(rateLimiter)
app.use(configurationCors);;
app.use(checkContentLength);

app.use('/auth', AuthRouter);
app.use('/auth', TokenRouter);

app.use(errorHandler);

export default app;