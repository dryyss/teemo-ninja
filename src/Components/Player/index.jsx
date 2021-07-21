/* eslint-disable no-constant-condition, arrow-body-style */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TimelineLite, Linear, gsap } from 'gsap';
import _orderBy from 'lodash/orderBy';
import _debounce from 'lodash/debounce';

import { getWeapons } from '../../Store/selectors/Items';
import { useCooldown } from '../../Hooks/useCooldown';

import './styles.scss';

const tl = new TimelineLite({ repeat: -1, repeatDelay: 2 });

const CD_DELAY = 2000;
const Player = () => {
  const refPlayer = useRef(null);
  const refWeapon = useRef(null);
  const weapons = useSelector(getWeapons);
  const [cooledDown, setCooledDown] = useCooldown(CD_DELAY); // pass in length of cooldown in ms

  useEffect(() => {
    if (refPlayer.current) {
      refPlayer.current.style.backgroundImage =
        'url("./images/player/teemo.gif")';
    }

    if (refWeapon.current) {
      const weaponsGsap = gsap.utils.toArray('.player-weapon');
      // when receive new event weapon wait the finish animation to reset it
      tl.seek(0).clear();

      weaponsGsap.forEach((weaponGsap) => {
        tl.staggerFromTo(
          [weaponGsap],
          CD_DELAY / 1000 / 2,
          {
            backgroundImage: `url(./images/weapons/${weaponGsap.id.slice(
              0,
              7,
            )}.png)`,
            left: 70,
            ease: Linear.easeNone,
            opacity: 1,
          },
          {
            left: 'calc(100% - 70px)',
            delay: 0.5,
          },
          1,
        ).staggerTo([weaponGsap], 0, { opacity: 0 }, 1);
      });
    }

    setCooledDown(false);

    return () => setCooledDown(true);
  }, [setCooledDown, cooledDown]);

  const playerWeapons = useMemo(
    () =>
      _orderBy(
        weapons.map((weapon) => (
          <div
            key={weapon}
            id={weapon}
            className="player-weapon"
            ref={refWeapon}
          />
        )),
        null,
        'desc',
      ),
    [weapons],
  );

  return (
    <>
      {playerWeapons}
      <div className="player-image" ref={refPlayer} />
    </>
  );
};

export default Player;
