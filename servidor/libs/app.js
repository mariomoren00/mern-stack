'use strict';

// Declare dependencies
import express from 'express';
import consign from 'consign';

// Initialize express
var app = express();

// Declare consign with path
consign()
  .include('libs/middlewares.js')
  .then('api/routes')
  .then('libs/boots.js')
  .into(app);
