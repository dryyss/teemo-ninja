import _get from 'lodash/get';
import { initialState } from '../../reducers/World';

export const getWorld = (s) => s.WorldReducer;

export const getStages = (s) =>
  _get(s.WorldReducer, `world.${s.WorldReducer.currentStage}`);

export const getCurrentStage = (s) =>
  _get(s.WorldReducer, 'currentStage', initialState.currentStage);

export const getCurrentLevel = (s) =>
  _get(s.WorldReducer, 'currentLevel', initialState.currentLevel);
