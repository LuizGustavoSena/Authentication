import express from 'express';
import AuthRouter from './routes/auth-route';
import TokenRouter from './routes/token-route';

const app = express();

app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/auth', TokenRouter);

export default app;