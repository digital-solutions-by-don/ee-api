const db = require('../db.config');

class Application {
  static find() {
    return db('application')
        .select()
        .returning('*');
  }

  static findBy(id) {
    return db('application')
        .where({ id })
        .returning('*');
  }

  static findByUserId(userId) {
    return db('application')
        .where('user_id', userId)
        .returning('*');
  }

  static async add(personalData) {
    const [id] = await db('application')
        .insert(personalData);
    return this.findBy(id);
  }

  static async update(personalData) {
    const [id] = await db('application')
        .where('id', message.id)
        .update(personalData);
    return this.findBy(id);
  }

  static remove(id) {
    return db('application')
        .where({ id })
        .del()
        .returning('*');
  }
}

module.exports = Application;
