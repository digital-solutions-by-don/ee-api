const MessageStore = require('../stores/messages.store');

class MessageController {
  static async fetch(req, res) {
    try {
      const payload = await MessageStore.fetch(req);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async fetchById(req, res) {
    try {
      const payload = await MessageStore.fetchById(req);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async add(req, res) {
    try {
      const payload = await MessageStore.add(req);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }

  static async delete(req, res) {
    try {
      const payload = await MessageStore.delete(req);
    } catch (exception) {
      res.status(500)
         .send(exception);
    }
  }
}

module.exports = MessageController;