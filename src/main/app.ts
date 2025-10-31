import express from 'express';
const app = express();
const protectedRouter = express.Router();

app.use(express.json());

export default app;