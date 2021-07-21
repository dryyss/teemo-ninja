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

const InfoStage = ({ currentStage = null, currentLevel = null }) => (
  <div
    style={{
      width: '40%',
      margin: '0 auto',
      borderTop: '20px solid white',
      borderLeft: '30px solid transparent',
      borderRight: '30px solid transparent',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0,
      left: 0,
      height: 20,
      filter: 'drop-shadow(0 0 2px black)',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        position: 'relative',
        top: '-20px',
        textAlign: 'center',
        fontSize: 'small',
        fontWeight: 'bold',
      }}
    >
      {currentStage.replace('-', ': ')} {currentLevel.replace('-', ': ')}
    </div>
  </div>
);

const Stage = ({ animationFinished, currentStage }) => {
  const refStage = useRef(null);

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
  const currentStage = useSelector(getCurrentStage);
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
      <InfoStage currentStage={currentStage} currentLevel={currentLevel} />
      <Stage
        currentStage={currentStage}
        animationFinished={handleAnimationFinished}
      />
      <Player />
    </div>
  );
};

export default World;
