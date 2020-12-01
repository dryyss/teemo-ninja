import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Menu from './Screens/Menu';
import InGame from './Screens/InGame';
import NotFound from './Screens/NotFound';

import { ROUTES } from './contants';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.MENU} component={Menu} />
      <Route path={ROUTES.GAME} component={InGame} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
