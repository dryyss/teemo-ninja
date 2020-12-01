import React from 'react';
import Items from '../../Components/Items';
import Stages from '../../Components/Stages';

import './styles.scss';

const InGameScreen = () => (
  <div className="container">
    <div className="above">
      <Stages />
    </div>
    <div className="below">
      <Items />
    </div>
  </div>
);

export default InGameScreen;
