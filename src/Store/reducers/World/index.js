import {
  GENERATE_WORLD_GAME,
  UPGRADE_LEVEL,
  UPGRADE_STAGE,
} from '../../../contants';

const initialState = {
  currentStage: 'stage-1', // the generate stage start at 1
  currentLevel: 'level-1', // the generate level start at 1
  world: {},
};

export const WorldReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_WORLD_GAME:
      return {
        ...state,
        world: action.payload,
      };
    case UPGRADE_STAGE:
      return {
        ...state,
        currentStage: `stage-${Number(state.currentStage.split('-')[1]) + 1}`,
      };
    case UPGRADE_LEVEL:
      return {
        ...state,
        currentLevel: `level-${Number(state.currentLevel.split('-')[1]) + 1}`,
      };
    default:
      return state;
  }
};
