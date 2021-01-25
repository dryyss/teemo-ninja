import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TimelineLite } from 'gsap';

import { getWeapons } from '../../Store/selectors/Items';

import './styles.scss';

const tl = new TimelineLite();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const Items = () => {
  const refItems = useRef(null);
  const weapons = useSelector(getWeapons);

  useEffect(() => {
    if (refItems.current) {
      tl.fromTo(
        [refItems.current],
        {
          transform: `matrix3d(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            500,200,0,1
          )`,
        },
        {
          transform: `matrix3d(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            ${getRandomArbitrary(20, 450)},${getRandomArbitrary(20, 150)},0,1
          )`,
          duration: 0.8,
        },
      );
    }
  });

  return (
    <div className="items">
      {weapons.map((img) => (
        <div
          className="weapon-image"
          style={{ backgroundImage: `url(./images/weapons/${img}.png)` }}
          ref={refItems}
        />
      ))}
    </div>
  );
};

export default Items;
