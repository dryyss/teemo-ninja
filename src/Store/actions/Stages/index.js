import { INIT_STAGES_GAME } from '../../../contants';
import { generateStages } from '../../helpers';

export const initStagesGame = () => ({
  type: INIT_STAGES_GAME,
  payload: generateStages(),
});
