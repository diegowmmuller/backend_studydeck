/**
 * Classe Modelo para a entidade User.
 * Representa a estrutura de dados de um usuário, sem lógica de banco.
 */
class User {
  constructor({ id, name, username, email, password }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password; // Apenas armazena o dado, sem criptografar
  }
}

module.exports = User;
