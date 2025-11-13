/**
 * Classe Modelo para a entidade Card.
 * Representa a estrutura de dados de um card, sem lógica de banco.
 */
class Card {
  constructor({ id, name, description, start_time, end_time, status, color, user_id }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.start_time = start_time;
    this.end_time = end_time;
    this.status = status;
    this.color = color;
    this.user_id = user_id;
  }
}

module.exports = Card;
