const express = require('express');
const MsgCtrl = require('../controllers/messages.controller');
const adminRouter = express.Router();

adminRouter.get('/messages', MsgCtrl.fetch);

module.exports = adminRouter;
