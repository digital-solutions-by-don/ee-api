const Message = require('../../data/models/message.model');
const Validation = require('../stores/validation.store');

class MessageStore {
  static async fetch(req) {
    try {
      return await Message.find();
    } catch (exception) {
      return exception;
    }
  }

  static async fetchById(req) {
    try {
      return await Message.findByUserId(req.user);
    } catch (exception) {
      return exception;
    }
  }

  static async add(req) {
    let result = {};
    const { errors, isValid } = Validation.message(req.body);
    if (!isValid) {
      result.status = 400;
      result.message = errors;
      return result;
    }

    return await Message.add(req.body);
  }

  static async delete(req) {
    try {
      return await Message.remove(req.params.id);
    } catch (exception) {
      return exception;
    }
  }

}

module.exports = MessageStore;