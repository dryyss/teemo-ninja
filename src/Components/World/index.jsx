import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineLite } from 'gsap';

import _findLastKey from 'lodash/findLastKey';

import { upgradeLevel, upgradeStage } from '../../Store/actions/World';
import {
  getCurrentLevel,
  getCurrentStage,
  getStages,
} from '../../Store/selectors/World';

import Player from '../Player';

import './styles.scss';

const tl = new TimelineLite();

const Stage = ({ animationFinished }) => {
  const refStage = useRef(null);
  const currentStage = useSelector(getCurrentStage);

  useEffect(() => {
    if (refStage.current && currentStage) {
      refStage.current.style.backgroundImage = `url("./images/world/${currentStage}.jpg")`;

      tl.fromTo(
        [refStage.current],
        { opacity: 0, onStart: () => animationFinished(false) },
        { opacity: 1, duration: 2 },
      ).fromTo(
        [refStage.current],
        { backgroundPosition: '0% 0' },
        {
          duration: 5,
          backgroundPosition: '100% 0',
          ease: 'none',
          onComplete: () => animationFinished(true),
        },
      );
    }
  });

  return <div className="stage-image" ref={refStage} />;
};

const World = () => {
  const dispatch = useDispatch();
  const stages = useSelector(getStages);
  const currentLevel = useSelector(getCurrentLevel);

  const handleAnimationFinished = (animationFinished) => {
    if (animationFinished) {
      if (currentLevel === _findLastKey(stages)) {
        dispatch(upgradeStage());
      }
      dispatch(upgradeLevel());
    }
  };

  return (
    <div className="stage">
      <Stage animationFinished={handleAnimationFinished} />
      <Player />
    </div>
  );
};

export default World;
