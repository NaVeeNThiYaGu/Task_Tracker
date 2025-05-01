import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ msg: 'User created' });
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await user.comparePassword(password))) {
//     return res.status(401).json({ msg: 'Invalid credentials' });
//   }
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log('Login attempt for email:', email);

  if (!user) {
    console.log('User not found');
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  console.log('Password match:', isMatch);

  if (!isMatch) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;