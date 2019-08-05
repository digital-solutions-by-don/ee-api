const AuthenticationStore = require('../stores/authentication.store');

module.exports = function(app) {
  app.use('/api', require('./routes.public'));
  app.use('/api', [AuthenticationStore.authenticate],
      require('./routes.private.js'));
  app.use('/api/admin',
      [AuthenticationStore.authenticate, AuthenticationStore.isAdmin],
      require('./routes.admin.js'));
};