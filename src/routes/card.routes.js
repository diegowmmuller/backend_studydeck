const express = require('express');
const router = express.Router();

const CardController = require('../controllers/card.controller');
const controller = new CardController();

// Rotas livres
router.post('/', controller.create.bind(controller));
router.get('/user/:user_id', controller.getAllByUser.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

module.exports = router;
