// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/app';
import About from './components/about';
import NotFound from './components/notfound';
import Users from './components/users';
import EditUsers from './components/users/edit.js';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/users" component={Users} />
    <Route path="/edituser/:id" component={EditUsers} />
    <Route path="*" component={NotFound} />
  </Router>
);
 
export default Routes;