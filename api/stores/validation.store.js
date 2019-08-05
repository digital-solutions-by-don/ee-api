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

  static personalData(data) {
    let errors = {};
    data.first_name = !(this.isEmpty(data.first_name)) ? data.first_name : '';
    data.last_name = !(this.isEmpty(data.last_name)) ? data.last_name : '';
    data.address = !(this.isEmpty(data.address)) ? data.address : '';
    data.city = !(this.isEmpty(data.city)) ? data.city : '';
    data.state = !(this.isEmpty(data.state)) ? data.state : '';
    data.zip_code = !(this.isEmpty(data.zip_code)) ? data.zip_code : '';
    data.phone_number = !(this.isEmpty(data.phone_number))
        ? data.phone_number
        : '';
    data.email = !(this.isEmpty(data.email)) ? data.email : '';
    data.position = !(this.isEmpty(data.position)) ? data.position : '';
    data.start_pay = !(this.isEmpty(data.start_pay)) ? data.start_pay : '';
    data.start_date = !(this.isEmpty(data.start_date)) ? data.start_date : '';

    if (Validator.isEmpty(data.first_name)) {
      errors.first_name = '*Required';
    }

    if (Validator.isEmpty(data.last_name)) {
      errors.last_name = '*Required';
    }

    if (Validator.isEmpty(data.address)) {
      errors.address = '*Required';
    }

    if (Validator.isEmpty(data.city)) {
      errors.city = '*Required';
    }

    if (!Validator.isLength(data.state, { min: 2, max: 2 })) {
      errors.state = 'Must provide the State Abbreviation';
    }

    if (Validator.isEmpty(data.state)) {
      errors.state = '*Required';
    }
    console.log(data.start_date);
    if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(data.zip_code)) {
      errors.zip_code = 'Please provide a valid zip code';
    }

    if (Validator.isEmpty(data.zip_code)) {
      errors.zip_code = '*Required';
    }

    if (!/(^\d{10}$)|(^\d{3}-\d{3}-\d{4}$)|(^\d{1}-\d{3}-\d{3}-\d{4}$)|(^\(\d{3}\)\s\d{3}-\d{4}$)/.test(
        data.phone_number)) {
      errors.phone_number = 'Please provide a valid phone number';
    }

    if (Validator.isEmpty(data.phone_number)) {
      errors.phone_number = '*Required';
    }

    if (!isEmpty(data.alt_phone_number) &&
        /!(^\d{10}$)|(^\d{3}-\d{3}-\d{4}$)|(^\d{1}-\d{3}-\d{3}-\d{4}$)|(^\(\d{3}\)\s\d{3}-\d{4}$)/.test(
            data.alt_phone_number)) {
      errors.alt_phone_number = 'Please provide a valid phone number';
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = '*Required';
    }

    if (Validator.isEmpty(data.position)) {
      errors.position = '*Required';
    }

    if (Validator.isEmpty(data.start_pay)) {
      errors.start_pay = '*Required';
    }

    if (!data.full_time && !data.part_time && !data.temporary) {
      errors.schedule = 'Please select at least one preference';
    }

    if (!data.weekends && !data.weekdays && !data.evenings && !data.nights) {
      errors.shift = 'Please select at least one preference';
    }

    if (!data.auth_yes && !data.auth_no || data.auth_yes && data.auth_no) {
      errors.auth = 'Please select either yes or no';
    }

    if (!data.under_yes && !data.under_no || data.under_yes && data.under_no) {
      errors.under = 'Please select either yes or no';
    }

    if ((data.under_yes && !data.permit_yes && !data.permit_no) ||
        (data.under_yes && data.permit_yes && data.permit_no)) {
      errors.permit = 'Please select either yes or no';
    }

    if (data.under_no && data.permit_yes || data.permit_no) {
      data.permit_yes = false;
      data.permit_no = false;
    }

    return {
      errors,
      isValid: this.isEmpty(errors),
    };
  }
}

module.exports = ValidationStore;
