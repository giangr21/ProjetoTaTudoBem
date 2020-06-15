import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Index from '../pages/Index';
import SignUpUser from '../pages/SignUpUser';
import SignUpVolun from '../pages/SignUpVolun';
import Dashboard from '../pages/Dashboard';
import Chat from '../pages/Chat';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Index} />
    <Route path="/signup-user" component={SignUpUser} />
    <Route path="/signup-volun" component={SignUpVolun} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/chat" component={Chat} isPrivate />
  </Switch>
);

export default Routes;
