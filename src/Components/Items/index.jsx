import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { generateItemsByLevel } from '../../Store/actions/Items';
// import { getItems } from '../../Store/selectors/Items';
import { getWorld } from '../../Store/selectors/World';

import './styles.scss';

const Items = () => {
  const dispatch = useDispatch();
  const stages = useSelector(getWorld);
  // const items = useSelector(getItems);

  useEffect(() => {
    dispatch(generateItemsByLevel());
  }, [dispatch]);

  return <div className="items">items here</div>;
};

export default Items;
