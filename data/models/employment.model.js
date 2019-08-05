const db = require('../db.config');

class Application {
  static find() {
    return db('employment')
        .select()
        .returning('*');
  }

  static findBy(id) {
    return db('employment')
        .where('app_id', id)
        .returning('*');
  }

  static async add(employmentData) {
    const [app_id] = await db('employment')
        .insert(employmentData);
    return this.findBy(app_id);
  }

  static async update(employmentData) {
    const [app_id] = await db('employment')
        .where('id', employmentData.id)
        .update(employmentData);
    return this.findBy(app_id);
  }

  static remove(id) {
    return db('employment')
        .where({ id })
        .del()
        .returning('*');
  }
}

module.exports = Application;
