import passport from "passport";
import githubService from 'passport-github2';
import local from 'passport-local';
import { usersModel } from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';

const localStrategy = local.Strategy;
const initializePassport = () => {

  passport.use('register', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;

      try {
        let user = await usersModel.findOne({ email: username });

        if (user) {
          console.log('User alredy exists');
          return done(null, false);
        }

        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password: createHash(password)
        }
        let result = await usersModel.create(newUser);
        return done(null, result);
      }
      catch (err) {
        return done('Error al obtener el usuario' + err);
      }
    }
  ))

  passport.use('login', new localStrategy(
    { usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await usersModel.findOne({ email: username });

        if (!user) {
          console.log('Usuario no existe');
          return done(null, false);
        }
        if (!isValidPassword(user, password)) return done(null, false);

        return done(null, user);
      }
      catch (err) {
        return done('error al obtener el usuario' + err);
      }
    }));

  passport.use('github', new githubService({
    clientID: 'Iv1.1b1f54066790674f',
    clientSecret: '771093a48eaffb5a556abfc2ccfec802b39323f9',
    callbackURL: 'http://localhost:8080/api/sessions/'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await usersModel.findOne({ email: profile._json.email });
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          last_name: 'not last name',
          age: 21,
          email: profile._json.email,
          password: 'not password'
        };
        let result = await usersModel.create(newUser);
        done(null, result);
      }
      else {
        done(null, user);
      }
    }
    catch (err) {
      return done(err);
    }
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersModel.findById(id);
    done(null, user);
  });
}

export default initializePassport;