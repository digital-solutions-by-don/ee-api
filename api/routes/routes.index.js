const AuthenticationStore = require('../stores/authentication.store');

module.exports = function (app) {
  app.use('/api', require('./routes.public'));
  app.use('/api', [AuthenticationStore.authenticate], require('./routes.private.js'));
};