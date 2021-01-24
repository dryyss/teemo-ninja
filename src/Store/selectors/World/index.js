import _get from 'lodash/get';

export const getWorld = (s) => s.WorldReducer;

export const getCurrentStage = (s) =>
  _get(s.WorldReducer, `world.${s.WorldReducer.currentStage}`);

export const getCurrentLevel = (s) =>
  _get(
    s.WorldReducer,
    `world.${s.WorldReducer.currentStage}.${s.WorldReducer.currentLevel}`,
  );
