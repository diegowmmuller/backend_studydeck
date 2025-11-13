const CardService = require('../service/card.service');
const cardService = new CardService();

class CardController {
  async create(req, res) {
    try {
      const card = await cardService.create(req.body);
      return res.status(201).json(card);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const card = await cardService.getById(req.params.id);
      return res.json(card);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async getAllByUser(req, res) {
    try {
      const cards = await cardService.getAllByUser(req.params.user_id);
      return res.json(cards);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const card = await cardService.update({
        id: req.params.id,
        ...req.body,
      });

      return res.json(card);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await cardService.delete(req.params.id);
      return res.json({ message: 'Card deleted' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CardController;
