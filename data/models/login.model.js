const db = require('../db.config');

class Login {
  static async add (user) {
    const [id] = await db('login').insert(user);
    return await this.findById(id);
  }

  static findById (id) {
    return db('login').where({ id }).first();
  }

  static async findByEmail ({ email }) {
    return db('login').where({ email });
  }
}

module.exports = Login;
