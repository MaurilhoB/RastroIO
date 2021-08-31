import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Archived from '../pages/Archived';
import Dashboard from '../pages/Dashboard';
import New from '../pages/New';
import Edit from '../pages/Edit';
import Track from '../pages/Tracking';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/archived" component={Archived} />
    <Route path="/new" component={New} />
    <Route path="/edit/:id" component={Edit} />
    <Route path="/track/:id" component={Track} />
  </Switch>
);

export default Routes;
