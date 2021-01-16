import React, { useEffect, useRef } from 'react';
import { TimelineLite } from 'gsap';

import Player from '../../Images/player/teemo.gif';

import './styles.scss';

const Stages = () => {
  const refStage = useRef(null);
  const refPlayer = useRef(null);

  const stage = require('../../Images/stages/1/level.jpg');

  useEffect(() => {
    if (refStage.current) {
      const timeline = new TimelineLite();

      timeline
        .fromTo([refStage.current, refPlayer.current], { opacity: 0 }, { opacity: 1, duration: 2 })
        .fromTo([refStage.current], {
          objectPosition: '0% 0',
        },
        {
          duration: 30,
          objectPosition: '100% 0',
          ease: 'none',
        });
    }
  });

  return (
    <div className="stage">
      <img className="stage-image" ref={refStage} src={stage.default} alt="stage" />
      <img className="player-image" ref={refPlayer} src={Player} alt="player" />
    </div>
  );
};

export default Stages;
