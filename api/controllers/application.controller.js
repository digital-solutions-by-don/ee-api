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

}

module.exports = ApplicationController;
