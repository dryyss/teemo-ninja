import React, { useEffect, useRef } from 'react';
import { TimelineLite } from 'gsap';

import './styles.scss';

const Player = () => {
  const refPlayer = useRef(null);

  useEffect(() => {
    if (refPlayer.current) {
      refPlayer.current.style.backgroundImage =
        'url("./images/player/teemo.gif")';
    }
  });

  return <div className="player-image" ref={refPlayer} />;
};

export default Player;
