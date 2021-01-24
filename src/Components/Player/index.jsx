import React, { useEffect, useRef } from 'react';

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
