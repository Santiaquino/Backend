import { Router } from 'express';
import { usersModel } from '../dao/models/users.model.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) return res.status(400).json({ status: 'Error!', error: 'Enter all data' });

  const exists = await usersModel.findOne({ email });
  if (exists) return res.status(400).json({ status: 'Error!', error: 'User already exists' });

  await usersModel.create({
    first_name,
    last_name,
    email,
    password
  });

  res.json({ status: 'success!', message: 'Create user' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ status: 'Error!', error: 'Enter all data' });

  const user = await usersModel.findOne({ email, password });
  if (!user) return res.status(400).json({ status: 'Error!', error: 'The user does not exist' });

  if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') {
    req.session.user = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      rol: 'admin'
    }
  }
  else {
    req.session.user = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      rol: 'usuario'
    };
  }

  res.json({ status: 'success!', message: 'Login' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.json({status: 'error!', error: 'Failed to log out'})
    res.json({status: 'success!', message: 'Logout success!'})
  });
});

export default router;