const Validator = require('validator');
const Login = require('../../data/models/login.model');
const Users = require('../../data/models/users.model');
const bcrypt = require('bcryptjs');
const AuthenticationStore = require('./authentication.store');

class AuthStore {
  static async register (req) {
    let result = {};
    try {
      const { errors, isValid } = this.validateRegisterInputs(req.body);
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
      const savedLogin = await Login.add({ email, password: this.encryptPassword(password) });
      const savedUser = await Users.add({ first_name, last_name, email });
      return ({ token: this.generateToken(savedLogin) });
    } catch (exception) {
      return exception;
    }
  }

  static async login (req) {
    let result = {};
    try {
      const { errors, isValid } = this.validateLoginInputs(req.body);
      if (!isValid) {
        result.status = 400;
        result.message = errors;
        return result;
      }

      const user = await Login.findByEmail(req.body);
      console.log(user);
      if (user.length === 0) {
        result.status = 404;
        result.message = { email: 'This email address is not registered!' };
        return result;
      }
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        return ({ token: this.generateToken(user) });
      } else {
        result.status = 401;
        result.message = 'Invalid Password';
        return result;
      }
    } catch (exception) {
      return exception;
    }
  }

  static isEmpty (value) {
    return value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0);
  }

  static validateLoginInputs (data) {
    let errors = {};

    data.email = !(this.isEmpty(data.email))
      ? data.email
      : '';
    data.password = !(this.isEmpty(data.password))
      ? data.password
      : '';

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid Email Address';
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = 'Required';
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = 'Required';
    }

    return {
      errors,
      isValid: this.isEmpty(errors),
    };

  }

  static validateRegisterInputs (data) {
    let errors = {};

    data.first_name = !(this.isEmpty(data.first_name))
      ? data.first_name
      : '';

    data.last_name = !(this.isEmpty(data.last_name))
      ? data.last_name
      : '';

    data.email = !(this.isEmpty(data.email))
      ? data.email
      : '';

    data.password = !(this.isEmpty(data.password))
      ? data.password
      : '';
    data.password2 = !(this.isEmpty(data.password2))
      ? data.password2
      : '';

    if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
      errors.first_name = 'First name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.first_name)) {
      errors.first_name = 'Required';
    }

    if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
      errors.last_name = 'Last name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.last_name)) {
      errors.last_name = 'Required';
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid Email Address';
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = 'Required';
    }

    if (!Validator.isLength(data.password, { min: 5, max: 20 })) {
      errors.password = 'Password must be between 5 and 20 characters';
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = 'Required';
    }

    if (data.password !== data.password2) {
      errors.password2 = 'Passwords must match';
    }

    return {
      errors,
      isValid: this.isEmpty(errors),
    };

  }

  static encryptPassword (password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static generateToken (user) {
    return `Bearer ${AuthenticationStore.signJwt(user)}`;
  }
}

module.exports = AuthStore;