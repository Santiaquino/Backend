import { Router } from 'express';
import passport from 'passport';
import { usersModel } from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';

const router = Router();

//register

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister'  }), async (req, res) => {
  res.json({ status: 'success!', message: 'User registered' });
});

router.get('/failregister', async (req, res) => {
  console.log('Failed strategy');
  res.json({ error: 'Failed' });
});

// login

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
  const { email, password } = req.body;

  if (!req.user) return res.status(400).send({ status: 'Error!', error: 'password invalido' });

  const user = await usersModel.findOne({ email: email });

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

router.get('/faillogin', async (req, res) => {
  res.json({ status: 'Error!', error: 'Failed' });
});

//logout

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.json({ status: 'error!', error: 'Failed to log out' })
    res.json({ status: 'success!', message: 'Logout success!' })
  });
});

// github

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
  req.session.user = req.user;
  res.redirect('/products');
});

export default router;