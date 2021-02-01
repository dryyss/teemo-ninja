import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineLite } from 'gsap';

import { getWeapons, getBagSize } from '../../Store/selectors/Items';
import { mergeWeapons } from '../../Store/actions/Items';

import './styles.scss';

const tl = new TimelineLite();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const Items = () => {
  const refItems = useRef(null);
  const dispatch = useDispatch();
  const weapons = useSelector(getWeapons);
  const bagSize = useSelector(getBagSize);

  useEffect(() => {
    if (refItems.current) {
      console.log('w', weapons);
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
          duration: 0.5,
        },
      );
    }
  });

  const dragStartHandler = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const dt = event.dataTransfer.getData('text');

    if (
      event.target.id !== dt &&
      event.target.id.slice(0, 7) === dt.slice(0, 7)
    ) {
      dispatch(mergeWeapons([dt, event.target.id]));
    }
    event.dataTransfer.clearData();
  };

  const dragOverHandler = (event) => event.preventDefault();

  return (
    <div className="items">
      Bag {weapons.length} / {bagSize}
      {weapons.map((weapon) => (
        <div
          key={weapon}
          draggable="true"
          onDragStart={dragStartHandler}
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          className="weapon-image"
          id={weapon}
          style={{
            backgroundImage: `url(./images/weapons/${weapon.slice(0, 7)}.png)`,
          }}
          ref={refItems}
        />
      ))}
    </div>
  );
};

export default Items;
