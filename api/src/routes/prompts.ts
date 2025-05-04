import { NextFunction, Request, Response, Router } from 'express';
import { createPromptDirectory, deletePrompt, listPrompts, readPrompt, updatePrompt } from '../utils/filesystem';

const router = Router();

// GET /api/prompts - List all prompts
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await listPrompts();
    res.json({ message: 'OK', data: { prompts } });
  } catch (err) {
    next(err);
  }
});

// GET /api/prompts/:name - Get prompt metadata and content
router.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params;
    const prompt = await readPrompt(name);
    res.json({ message: 'OK', data: prompt });
  } catch (err) {
    next(err);
  }
});

// POST /api/prompts - Create a new prompt
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, tags, content } = req.body;
    await createPromptDirectory(name, description, tags, content);
    const prompt = await readPrompt(name);
    res.status(201).json({ message: 'OK', data: prompt });
  } catch (err) {
    next(err);
  }
});

// PUT /api/prompts/:name - Update prompt metadata and content (partial update allowed)
router.put('/:name', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oldName = req.params.name;
    // Read current prompt to get existing values
    const current = await readPrompt(oldName);
    const { description, tags, content } = req.body;
    // Use existing values if not provided
    const updateData = {
      name: oldName,
      description: description !== undefined ? description : current.metadata.description,
      tags: tags !== undefined ? tags : current.metadata.tags,
      content: content !== undefined ? content : current.content,
    };
    await updatePrompt(oldName, updateData);
    const prompt = await readPrompt(updateData.name);
    res.json({ message: 'OK', data: prompt });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/prompts/:name - Delete a prompt
router.delete('/:name', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params;
    await deletePrompt(name);
    res.status(204).json({ message: 'OK', data: {} });
  } catch (err) {
    next(err);
  }
});

export default router;
