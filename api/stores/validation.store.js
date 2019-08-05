const Validator = require('validator');

class ValidationStore {
  static isEmpty(value) {
    return value === undefined || value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);
  }

  static login(data) {
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

  static register(data) {
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

  static message(data) {
    let errors = {};

    data.message_subject = !(this.isEmpty(data.message_subject))
        ? data.message_subject
        : '';
    data.message_body = !(this.isEmpty(data.message_body))
        ? data.message_body
        : '';

    if (Validator.isEmpty(data.message_subject)) {
      errors.message_subject = '*Required';
    }

    if (Validator.isEmpty(data.message_body)) {
      errors.message_body = '*Required';
    }

    if (data.message_body.length > 254) {
      errors.message_body = 'Message can\'t be more than 255 characters';
    }

    return {
      errors,
      isValid: this.isEmpty(errors),
    };
  }
}

module.exports = ValidationStore;
