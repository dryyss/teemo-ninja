import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TimelineLite, Linear, gsap } from 'gsap';
import _orderBy from 'lodash/orderBy';

import { getWeapons } from '../../Store/selectors/Items';

import './styles.scss';

const tl = new TimelineLite({ repeat: -1, repeatDelay: 2 });

const Player = () => {
  const refPlayer = useRef(null);
  const refWeapon = useRef(null);
  const weapons = useSelector(getWeapons);

  useEffect(() => {
    if (refPlayer.current) {
      refPlayer.current.style.backgroundImage =
        'url("./images/player/teemo.gif")';
    }
  });

  useEffect(() => {
    if (refWeapon.current) {
      // step 1 : cooldown between each weapons
      const weaponsGsap = gsap.utils.toArray('.player-weapon');
      weaponsGsap.forEach((weaponGsap) => {
        tl.staggerFromTo(
          [weaponGsap],
          1,
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
            delay: 1,
          },
          0.5,
        ).staggerTo([weaponGsap], 0.5, { opacity: 0 }, 0.2);
      });
    }
  }, [weapons]);

  const test = _orderBy(weapons, '', ['desc']);

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
