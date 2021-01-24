import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Items from '../../Components/Items';
import World from '../../Components/World';

import { generateWorldGame } from '../../Store/actions/World';

import './styles.scss';

const InGameScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateWorldGame());
  });

  return (
    <div className="container">
      <div className="above">
        <World />
      </div>
      <div className="below">
        <Items />
      </div>
    </div>
  );
};

export default InGameScreen;
