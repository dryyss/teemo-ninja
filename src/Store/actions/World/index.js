import {
  GENERATE_WORLD_GAME,
  UPGRADE_LEVEL,
  UPGRADE_STAGE,
} from '../../../contants';
import { generateWorld } from '../../helpers';

export const generateWorldGame = () => ({
  type: GENERATE_WORLD_GAME,
  payload: generateWorld(),
});

export const upgradeStage = () => ({
  type: UPGRADE_STAGE,
});

export const upgradeLevel = () => ({
  type: UPGRADE_LEVEL,
});
