import { Request, Response } from 'express';

export const middleware = (_req: Request, res: Response) => {
  res.send('Hello from Prompts Manager API!');
};
