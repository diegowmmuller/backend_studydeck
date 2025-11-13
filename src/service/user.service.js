const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserDAO = require('../dao/user.dao');
const userDAO = new UserDAO();

const JWT_SECRET = 'segredo';

class UserService {
  /**
   * REGISTER
   */
  async register({ name, username, email, password }) {
    const existing = await userDAO.findByEmail(email);
    if (existing) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userDAO.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }

  /**
   * LOGIN
   */
  async login(email, password) {
    // Buscar usuário
    const user = await userDAO.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const db = await userDAO.getDB();
    const row = await userDAO.findByEmail(email);

    const match = await bcrypt.compare(password, row.password);
    if (!match) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user,
    };
  }

  /**
   * UPDATE USER
   */
  async update({ name, username, email, password, newPassword }) {
    const userDb = await userDAO.findByEmail(email);

    if (!userDb) {
      throw new Error('User not found');
    }

    // 2. Validar a senha atual (password)
    if (password) {
      const isMatch = await bcrypt.compare(password, userDb.password);

      if (!isMatch) {
        throw new Error('Invalid current password');
      }
    }

    // 3. Preparar objeto para update
    const updateData = {
      id: userDb.id,
      name,
      username,
      email,
    };

    // 4. Se o usuário quer trocar a senha → gerar hash
    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // 5. Atualizar
    const updatedUser = await userDAO.updateUser(updateData);

    return updatedUser;
  }
}

module.exports = UserService;
