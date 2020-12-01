import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../contants';

import './styles.scss';

const MenuScreen = () => (
  <div className="container">
    <div className="frame">
      <Link to={ROUTES.GAME}>
        START
      </Link>
    </div>
  </div>
);

export default MenuScreen;
