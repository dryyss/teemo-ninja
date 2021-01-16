import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { generateItemsByLevel } from '../../Store/actions/Items';
// import { getItems } from '../../Store/selectors/Items';
import { getStages } from '../../Store/selectors/Stages';

import './styles.scss';

const Items = () => {
  const dispatch = useDispatch();
  const stages = useSelector(getStages);
  // const items = useSelector(getItems);
  console.log('=> ', stages);

  useEffect(() => {
    dispatch(generateItemsByLevel());
  }, [dispatch]);

  return (
    <div className="items">
      items here
    </div>
  );
};

export default Items;
