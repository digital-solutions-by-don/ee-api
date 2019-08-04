const AuthStore = require('../stores/auth.store');

class AuthController {
  static async register (req, res) {
    try {
      let payload = await AuthStore.register(req);
      if (payload && payload.status) {
        return typeof payload.message !== 'object'
          ? res.status(payload.status).json({ message: payload.message })
          : res.status(payload.status).json(payload.message);
      }
      res.json(payload);
    } catch (exception) {
      res.status(500).send(exception);
    }
  }

  static async login (req, res) {
    try {
      let payload = await AuthStore.login(req);
      if (payload && payload.status) {
        return typeof payload.message !== 'object'
          ? res.status(payload.status).json({ message: payload.message })
          : res.status(payload.status).json(payload.message);
      }
      res.json(payload);
    } catch (exception) {
      res.status(500).send(exception);
    }
  }
}

module.exports = AuthController;
