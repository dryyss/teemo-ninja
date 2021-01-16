import { INIT_STAGES_GAME } from '../../../contants';

const initialState = {
  current: 0,
  world: {},
};

export const StagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STAGES_GAME:
      return {
        ...state,
        world: action.payload,
      };
    default:
      return state;
  }
};
