const db = require('../db');
const Card = require('../models/card.model');

class CardDAO {
  async getDB() {
    return await db;
  }

  async create({ name, description, start_time, end_time, status, color, user_id }) {
    const db = await this.getDB();

    const sql = `
INSERT INTO cards (name, description, start_time, end_time, status, color, user_id)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    const result = await db.run(sql, [name, description, start_time, end_time, status, color, user_id]);

    return new Card({
      id: result.lastID,
      name,
      description,
      start_time,
      end_time,
      status,
      color,
      user_id,
    });
  }

  async findById(id) {
    const db = await this.getDB();
    const sql = `SELECT * FROM cards WHERE id = ?`;

    const row = await db.get(sql, [id]);
    return row ? new Card(row) : null;
  }

  async findAllByUser(user_id) {
    const db = await this.getDB();
    const sql = `SELECT * FROM cards WHERE user_id = ?`;

    const rows = await db.all(sql, [user_id]);
    return rows.map((row) => new Card(row));
  }

  async update({ id, name, description, start_time, end_time, status, color }) {
    const db = await this.getDB();

    const sql = `
UPDATE cards
SET name = ?, description = ?, start_time = ?, end_time = ?, status = ?, color = ?
WHERE id = ?
`;

    await db.run(sql, [name, description, start_time, end_time, status, color, id]);

    return new Card({
      id,
      name,
      description,
      start_time,
      end_time,
      status,
      color,
    });
  }

  async delete(id) {
    const db = await this.getDB();
    const sql = `DELETE FROM cards WHERE id = ?`;

    await db.run(sql, [id]);
    return true;
  }
}

module.exports = CardDAO;
