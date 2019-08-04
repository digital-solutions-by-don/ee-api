const express = require('express');
const AuthCtrl = require('../controllers/auth.controller');
const publicRoutes = express.Router();

publicRoutes
    .post('/auth/register', AuthCtrl.register)
    .post('/auth/login', AuthCtrl.login);

module.exports = publicRoutes;
