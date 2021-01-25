import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineLite } from 'gsap';
import _debounce from 'lodash/debounce';

import { useInterval } from '../../Custom/Hooks';
import { addWeapon } from '../../Store/actions/Items';
import {
  getCraftMax,
  getWeapons,
  getBagSize,
} from '../../Store/selectors/Items';

import './styles.scss';

const Craft = () => {
  const refCooldownBar = useRef(null);
  const refCraft = useRef(null);
  const dispatch = useDispatch();
  const craftMax = useSelector(getCraftMax);
  const weapons = useSelector(getWeapons);
  const bagSize = useSelector(getBagSize);
  const [garbageWeapon, setGarbageWeapon] = useState(0);

  const handleAddWeapon = () => {
    if (weapons.length + 1 === bagSize) {
      refCraft.current.style.backgroundColor = '#ff000040';
    }
    if (garbageWeapon >= 1 && weapons.length < bagSize) {
      dispatch(addWeapon());
      setGarbageWeapon(garbageWeapon - 1);
    }
  };

  useInterval(() => {
    if (garbageWeapon < craftMax) {
      setGarbageWeapon(garbageWeapon + 1);
    }
  }, 1500);

  useEffect(() => {
    if (refCooldownBar.current) {
      if (garbageWeapon < craftMax) {
        refCooldownBar.current.classList.remove('animation');
        setTimeout(() => {
          refCooldownBar.current.classList.add('animation');
        }, 100);
      } else if (garbageWeapon === craftMax) {
        refCooldownBar.current.classList.remove('animation');
      }
    }
  }, [garbageWeapon, craftMax, weapons]);

  return (
    <div className="craft" ref={refCraft} onMouseUp={handleAddWeapon}>
      <div className="cooldown-bar animation" ref={refCooldownBar} />
      <div className="title">
        <img src="./images/craft/icon.png" alt="" />
        Craft
      </div>
      <div className="current-craft">
        {garbageWeapon} / {craftMax}
      </div>
    </div>
  );
};

export default Craft;
