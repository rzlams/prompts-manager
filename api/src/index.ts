import { middleware } from '#middlewares/middlewares.js';
import express from 'express';

const app = express();
const port = '3000';

app.get('/', middleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
