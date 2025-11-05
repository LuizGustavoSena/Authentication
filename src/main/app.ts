import express from 'express';
import AuthRouter from './routes/auth-route';

const app = express();
const protectedRouter = express.Router();

app.use(express.json());

protectedRouter.use('/auth', AuthRouter);

export default app;