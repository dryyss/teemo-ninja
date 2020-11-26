import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Menu from './Screens/Menu';
import NotFound from './Screens/NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
