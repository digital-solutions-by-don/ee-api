const express = require('express');
const MsgCtrl = require('../controllers/messages.controller');
const AppCtrl = require('../controllers/application.controller');

const adminRouter = express.Router();

adminRouter.get('/messages', MsgCtrl.fetch)
           .get('/application', AppCtrl.fetchAllApplications)
           .get('/application/:id', AppCtrl.fetchApplication);

module.exports = adminRouter;
