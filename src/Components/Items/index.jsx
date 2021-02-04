/* eslint-disable prefer-template */
import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineLite } from 'gsap';

import { getWeapons, getBagSize } from '../../Store/selectors/Items';
import { mergeWeapons } from '../../Store/actions/Items';

import './styles.scss';

const tl = new TimelineLite();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const Weapon = ({ id }) => {
  const dispatch = useDispatch();
  const refItems = useRef(null);

  useEffect(() => {
    if (refItems.current && id.indexOf('level-1') !== -1) {
      tl.fromTo(
        [refItems.current],
        {
          transform: `matrix3d(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            500,180,0,1
          )`,
        },
        {
          transform: `matrix3d(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            ${getRandomArbitrary(20, 450)},${getRandomArbitrary(0, 120)},0,1
          )`,
          duration: 0.5,
        },
      );
    }
    if (id.indexOf(':') !== -1) {
      const [x, y] = id.split('|')[1].split(':');

      tl.fromTo(
        [refItems.current],
        {
          transform: `translate(${x}px, ${y}px)`,
          backgroundImage: `url(./images/effects/smoke.gif?t=${new Date().valueOf()})`,
        },
        {
          duration: 0.75,
        },
      ).to([refItems.current], {
        backgroundImage: `url(./images/weapons/${id.slice(0, 7)}.png)`,
        duration: 0.1,
      });
    }
  }, [id]);

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
      const { e: x, f: y } = new WebKitCSSMatrix(event.target.style.transform); // eslint-disable-line
      dispatch(
        mergeWeapons({
          item1: dt,
          item2: event.target.id,
          pos: {
            x: parseInt(Math.abs(x), 10),
            y: parseInt(Math.abs(y), 10),
          },
        }),
      );
    }
    event.dataTransfer.clearData();
  };

  const dragOverHandler = (event) => event.preventDefault();

  return (
    <div
      id={id}
      key={id}
      ref={refItems}
      draggable="true"
      onDragStart={dragStartHandler}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      className="weapon-image"
      style={{
        backgroundImage: `url(./images/weapons/${id.slice(0, 7)}.png)`,
      }}
    />
  );
};

const Items = () => {
  const weapons = useSelector(getWeapons);
  const bagSize = useSelector(getBagSize);
  const weaponMemo = useMemo(
    () => weapons.map((weapon) => <Weapon key={weapon} id={weapon} />),
    [weapons],
  );

  return (
    <div className="items">
      Bag {weapons.length} / {bagSize}
      {weaponMemo}
    </div>
  );
};

export default Items;
