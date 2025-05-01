import express from 'express';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const count = await Project.countDocuments({ user: req.userId });
  if (count >= 4) return res.status(403).json({ msg: 'Project limit reached' });
  const project = new Project({ name: req.body.name, user: req.userId });
  await project.save();
  res.status(201).json(project);
});

router.get('/', protect, async (req, res) => {
  const projects = await Project.find({ user: req.userId });
  res.json(projects);
});

router.get('/:id', protect, async (req, res) => {
  const project = await Project.findById(req.params.id);
  const tasks = await Task.find({ project: req.params.id });
  res.json({ ...project.toObject(), tasks });
});

export default router;