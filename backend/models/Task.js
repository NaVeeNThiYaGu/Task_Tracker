import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

export default mongoose.model('Task', taskSchema);