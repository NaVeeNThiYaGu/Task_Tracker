import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:projectId', protect, async (req, res) => {
  const task = new Task({ ...req.body, project: req.params.projectId });
  await task.save();
  res.status(201).json(task);
});

router.put('/:taskId', protect, async (req, res) => {
  const updates = req.body;
  if (updates.status === 'completed') updates.completedAt = new Date();
  const task = await Task.findByIdAndUpdate(req.params.taskId, updates, { new: true });
  res.json(task);
});

router.delete('/:taskId', protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.json({ msg: 'Task deleted' });
});

export default router;
