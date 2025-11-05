import express from 'express';
import AuthRouter from './routes/auth-route';
import TokenRouter from './routes/token-route';

const app = express();
const protectedRouter = express.Router();

app.use(express.json());

protectedRouter.use('/auth', AuthRouter);
protectedRouter.use('/auth', TokenRouter);

export default app;