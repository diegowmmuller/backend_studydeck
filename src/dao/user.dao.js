const db = require('../db');
const User = require('../models/user.model');

class UserDAO {
  async getDB() {
    return await db;
  }

  async create({ name, username, email, password }) {
    const db = await this.getDB();
    const sql = `
      INSERT INTO users (name, username, email, password)
      VALUES (?, ?, ?, ?)
    `;

    const result = await db.run(sql, [name, username, email, password]);

    return new User({
      id: result.lastID,
      name,
      username,
      email,
    });
  }

  async updateUser({ id, name, username, email, password }) {
    const db = await this.getDB();

    const sql = `
      UPDATE users
      SET name = ?, username = ?, email = ?, password = ?
      WHERE id = ?
    `;

    await db.run(sql, [name, username, email, password, id]);

    return new User({
      id,
      name,
      username,
      email,
    });
  }

  async findByEmail(email) {
    const db = await this.getDB();
    const sql = `SELECT * FROM users WHERE email = ?`;

    const row = await db.get(sql, [email]);

    if (!row) return null;

    return new User({
      id: row.id,
      name: row.name,
      username: row.username,
      email: row.email,
      password: row.password,
    });
  }
}

module.exports = UserDAO;
