const db = require('../db.config');

class Users {
  // add, find, findBy, remove, update
  static find () {
    return db('users');
  }

  static async findBy (filter) {
    return db('users').where(filter);
  }

  static async add (user) {
    const [id] = await db('users').insert(user);
    return await this.findById(id);
  }

  static findById (id) {
    return db('users').where({ id }).first();
  }

  static async findByEmail ({ email }) {
    return db('users').where({ email });
  }

  static update (updatedUser) {
    return db('users').where('id', updatedUser.id).update(updatedUser);
  }

  static remove (id) {
    return db('users').where('id', id).del();
  }
}

module.exports = Users;