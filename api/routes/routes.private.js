const express = require('express');
const MsgCtrl = require('../controllers/messages.controller');
const AppCtrl = require('../controllers/application.controller');
const privateRoutes = express.Router();

privateRoutes
    .get('/messages/:id', MsgCtrl.fetchById)
    .post('/messages', MsgCtrl.add)
    .delete('/messages/:id', MsgCtrl.delete)
    .post('/application/personal-data', AppCtrl.addPersonalData)
    .get('/application/:id', AppCtrl.fetchUserApplication)
    .post('/application/employment-data', AppCtrl.addEmploymentData);

module.exports = privateRoutes;
