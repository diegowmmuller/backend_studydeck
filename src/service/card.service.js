const CardDAO = require('../dao/card.dao');
const cardDAO = new CardDAO();

class CardService {
  /**
   * Criar um card
   */
  async create({ name, description, start_time, end_time, status, color, user_id }) {
    // Regras de negócio opcionais aqui
    // (ex: validar se start_time < end_time, etc.)

    const card = await cardDAO.create({
      name,
      description,
      start_time,
      end_time,
      status,
      color,
      user_id,
    });

    return card;
  }

  /**
   * Buscar card por ID
   */
  async getById(id) {
    return await cardDAO.findById(id);
  }

  /**
   * Listar todos os cards de um usuário
   */
  async getAllByUser(user_id) {
    return await cardDAO.findAllByUser(user_id);
  }

  /**
   * Atualizar card por ID
   */
  async update({ id, name, description, start_time, end_time, status, color }) {
    const updated = await cardDAO.update({
      id,
      name,
      description,
      start_time,
      end_time,
      status,
      color,
    });

    return updated;
  }

  /**
   * Deletar card
   */
  async delete(id) {
    return await cardDAO.delete(id);
  }
}

module.exports = CardService;
