const db = require('../db.config');

class Group {
  static find() {
    return db('group');
  }

  static findBy(id) {
    return db('group').where({ id });
  }

  static findByUserId(userId) {
    return db('group').where({ user_id: userId });
  }

  static async add(message) {
    const [id] = await db('group').insert(message);
    return this.findBy(id);
  }

  static async update(message) {
    const [id] = await db('group').where('id', message.id).update(message);
    return this.findBy(id);
  }

  static remove(id) {
    return db('group').where({ id }).del();
  }
}

module.exports = Group;

