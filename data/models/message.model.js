const db = require('../db.config');

class Message {
  static find() {
    return db('messages');
  }

  static findBy(id) {
    return db('messages').where({ id });
  }

  static findByUserId(userId) {
    return db('messages').where({ user_id: userId });
  }

  static async add(message) {
    const [id] = await db('messages').insert(message);
    return this.findBy(id);
  }

  static async update(message) {
    const [id] = await db('messages').where('id', message.id).update(message);
    return this.findBy(id);
  }

  static remove(id) {
    return db('messages').where({ id }).del();
  }
}

module.exports = Message;

