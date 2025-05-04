import express from 'express';
import errorHandler from './middlewares/error-handler';
import promptsRouter from './routes/prompts';

const app = express();
const port = '3000';

app.use(express.json());
app.use('/api/prompts', promptsRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Prompts Manager API listening on port ${port}`);
});
