import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Archived from '../pages/Archived';
import Dashboard from '../pages/Dashboard';
import New from '../pages/New';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/archived" component={Archived} />
    <Route path="/new" component={New} />
  </Switch>
);

export default Routes;
