const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();
server.use(helmet(), bodyParser.urlencoded({extended:false}), cors(), morgan('dev'));
require('./routes/routes.index.js')(server);

module.exports = server;