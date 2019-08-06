const ApplicationStore = require('../stores/application.store');

class ApplicationController {
  static async fetchAllApplications(req, res) {
    try {
      const payload = await ApplicationStore.fetchAllApps();
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async fetchUserApplication(req, res) {
    try {
      const payload = await ApplicationStore.fetchUserApplication(req);
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async fetchApplication(req, res) {
    try {
      const payload = await ApplicationStore.fetchApplication(req);
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async addPersonalData(req, res) {
    try {
      const payload = await ApplicationStore.addPersonalData(req);
      if (payload && payload.status && payload.status !== 200) {
        return res.status(payload.status)
                  .json(payload.message);
      }
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async updatePersonalData(req, res) {
    try {
      const payload = await ApplicationStore.updatePersonalData(req);
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async deleteApplication(req, res) {
    try {
      const payload = await ApplicationStore.deleteApplication(req);
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async addEmploymentData(req, res) {
    try {
      const payload = await ApplicationStore.addEmploymentData(req);
      if (payload && payload.status && payload.status !== 200) {
        return res.status(payload.status)
                  .json(payload.message);
      }
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async fetchEmploymentData(req, res) {
    try {
      const payload = await ApplicationStore.fetchEmploymentData(req);
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async updateEmploymentData(req, res) {
    try {
      const payload = await ApplicationStore.updateEmploymentData(req);
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async deleteEmploymentData(req, res) {
    try {
      const payload = await ApplicationStore.removeEmploymentData(req);
      res.json(payload);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }
}

module.exports = ApplicationController;
