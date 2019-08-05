const Application = require('../../data/models/application.model');
const Employment = require('../../data/models/employment.model');
const ValidationStore = require('./validation.store');

class ApplicationStore {
  static async fetchAllApps() {
    try {
      return await Application.find();
    } catch (exception) {
      return exception;
    }
  }

  static async fetchUserApplication(req) {
    try {
      return await Application.findByUserId(req.user);
    } catch (exception) {
      return exception;
    }
  }

  static async fetchApplication(req) {
    try {
      return await Application.findBy(req.params.id);
    } catch (exception) {
      return exception;
    }
  }

  static async addPersonalData(req) {
    let result = {};
    try {
      const { errors, isValid } = ValidationStore.personalData(req.body);
      if (!isValid) {
        result.status = 400;
        result.message = errors;
        return result;
      }
      return await Application.add(req.body);
    } catch (exception) {
      return exception;
    }
  }

  static async addEmploymentData(req) {
    let result = {};
    try {
      const { errors, isValid } = ValidationStore.employmentData(req.body);

      if (!isValid) {
        result.status = 400;
        result.message = errors;
        return result;
      }
      return await Employment.add(req.body);
    } catch (exception) {
      return exception;
    }
  }
}