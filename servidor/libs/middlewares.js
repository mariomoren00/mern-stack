require('dotenv').config();

import bodyParser from 'body-parser';

module.exports = app => {

  // Declare port and env mode
  app.set('port', process.env.APP_PORT || 3000);
  app.set('env', process.env.APP_ENV);

  // Declare cors access control
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

};
