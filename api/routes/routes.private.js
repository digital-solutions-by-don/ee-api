const express = require('express');
const MsgController = require('../controllers/messages.controller');
const privateRoutes = express.Router();

privateRoutes.get('/messages', MsgController.fetch)
             .get('/messages/:id', MsgController.fetchById)
             .post('/messages', MsgController.add)
             .delete('/messages/:id', MsgController.delete);

module.exports = privateRoutes;
