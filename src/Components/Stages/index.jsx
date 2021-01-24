import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineLite } from 'gsap';
import _findLastKey from 'lodash/findLastKey';

import { upgradeLevel, upgradeStage } from '../../Store/actions/World';
import { getCurrentStage, getWorld } from '../../Store/selectors/World';

import './styles.scss';

const timeline = new TimelineLite();

const Stages = () => {
  const refStage = useRef(null);
  const refPlayer = useRef(null);
  const dispatch = useDispatch();
  const world = useSelector(getWorld);
  const currentStage = useSelector(getCurrentStage);

  const [animationFinish, setAnimationFinish] = useState(false);

  useEffect(() => {
    if (refStage.current) {
      refStage.current.style.backgroundImage = `url("./images/world/${world.currentStage}.jpg")`;
      refPlayer.current.style.backgroundImage =
        'url("./images/player/teemo.gif")';

      timeline
        .fromTo(
          [refStage.current, refPlayer.current],
          {
            opacity: 0,
            onStart: () => setAnimationFinish(false),
          },
          { opacity: 1, duration: 2 },
        )
        .fromTo(
          [refStage.current],
          { backgroundPosition: '0% 0' },
          {
            duration: 30,
            backgroundPosition: '100% 0',
            ease: 'none',
            onComplete: () => setAnimationFinish(true),
          },
        );
    }

    if (animationFinish) {
      if (world.currentLevel === _findLastKey(currentStage)) {
        dispatch(upgradeStage());
      }
      dispatch(upgradeLevel());
    }
  }, [
    animationFinish,
    world.currentLevel,
    world.currentStage,
    currentStage,
    dispatch,
  ]);

  return (
    <div className="stage">
      <div className="stage-image" ref={refStage} />
      <div className="player-image" ref={refPlayer} />
    </div>
  );
};

export default Stages;
