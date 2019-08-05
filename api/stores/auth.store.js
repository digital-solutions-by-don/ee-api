const Login = require('../../data/models/login.model');
const Users = require('../../data/models/users.model');
const bcrypt = require('bcryptjs');
const AuthenticationStore = require('./authentication.store');
const ValidationStore = require('./validation.store');

class AuthStore {
  static async register(req) {
    let result = {};
    try {
      const { errors, isValid } = ValidationStore.register(req.body);
      if (!isValid) {
        result.status = 400;
        result.message = errors;
        return result;
      }

      const user = await Users.findByEmail(req.body);
      if (user.length > 0) {
        result.status = 400;
        result.message = { email: 'This email address has already been registered.' };
        return result;
      }

      const { first_name, last_name, email, password } = req.body;
      const savedLogin = await Login.add(
          { email, password: this.encryptPassword(password) });
      const savedUser = await Users.add({ first_name, last_name, email });
      return ({ token: this.generateToken(savedLogin) });
    } catch (exception) {
      return exception;
    }
  }

  static async login(req) {
    let result = {};
    try {
      const { errors, isValid } = ValidationStore.login(req.body);
      if (!isValid) {
        result.status = 400;
        result.message = errors;
        return result;
      }

      const user = await Login.findByEmail(req.body);
      console.log(user);
      if (user.length === 0) {
        result.status = 404;
        result.message = { email: 'This email address is not registered.' };
        return result;
      }
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        return ({ token: this.generateToken(user) });
      } else {
        result.status = 401;
        result.message = { password: 'Invalid Password' };
        return result;
      }
    } catch (exception) {
      return exception;
    }
  }

  static encryptPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static generateToken(user) {
    return `Bearer ${AuthenticationStore.signJwt(user)}`;
  }
}

module.exports = AuthStore;