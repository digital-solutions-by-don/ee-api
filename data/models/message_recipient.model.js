const db = require('../db.config');

class MessageRecipient {
  static find() {
    return db('message_recipient');
  }

  static findBy(id) {
    return db('message_recipient').where({ id });
  }

  static findByUserId(userId) {
    return db('message_recipient').where({ user_id: userId });
  }

  static async add(message) {
    const [id] = await db('message_recipient').insert(message);
    return this.findBy(id);
  }

  static async update(message) {
    const [id] = await db('message_recipient').where('id', message.id).update(message);
    return this.findBy(id);
  }

  static remove(id) {
    return db('message_recipient').where({ id }).del();
  }
}

module.exports = MessageRecipient;

