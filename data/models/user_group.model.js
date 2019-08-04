const db = require('../db.config');

class UserGroup {
  static find() {
    return db('user_group');
  }

  static findBy(id) {
    return db('user_group').where({ id });
  }

  static findByUserId(userId) {
    return db('user_group').where({ user_id: userId });
  }

  static async add(message) {
    const [id] = await db('user_group').insert(message);
    return this.findBy(id);
  }

  static async update(message) {
    const [id] = await db('user_group').where('id', message.id).update(message);
    return this.findBy(id);
  }

  static remove(id) {
    return db('user_group').where({ id }).del();
  }
}

module.exports = UserGroup;

