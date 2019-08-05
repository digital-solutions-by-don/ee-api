const db = require('../db.config');

class Message {
  static find() {
    return db('messages')
        .select()
        .returning('*');
  }

  static findBy(id) {
    return db('messages')
        .where({ id })
        .returning('*');
  }

  static findByUserId(userId) {
    return db('messages')
        .where('creator_id', userId)
        .returning('*');
  }

  static async add(message) {
    const [creator_id] = await db('messages')
        .insert(message);
    return this.findByUserId(creator_id);
  }

  static async update(message) {
    const [id] = await db('messages')
        .where('id', message.id)
        .update(message);
    return this.findBy(id);
  }

  static remove(id) {
    return db('messages')
        .where({ id })
        .del()
        .returning('*');
  }
}

module.exports = Message;

