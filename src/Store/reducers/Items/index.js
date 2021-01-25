import { ADD_WEAPON } from '../../../contants';

const initialState = {
  craftMax: 5,
  bagSize: 5,
  weapons: [],
};

export const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WEAPON:
      return {
        ...state,
        weapons: [...state.weapons, action.payload],
      };
    default:
      return state;
  }
};
