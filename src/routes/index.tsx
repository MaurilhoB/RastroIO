import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Archived from '../pages/Archived';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/archived" component={Archived} />
  </Switch>
);

export default Routes;
