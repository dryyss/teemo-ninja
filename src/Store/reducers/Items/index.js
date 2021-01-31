import _uniqueId from 'lodash/uniqueId';
import { ADD_WEAPON, MERGE_WEAPONS } from '../../../contants';

const initialState = {
  craftMax: 5,
  bagSize: 10,
  weapons: [],
};

export const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WEAPON:
      return {
        ...state,
        weapons: [...state.weapons, `level-1-${_uniqueId()}`],
      };
    case MERGE_WEAPONS: {
      const item1 = action.payload[0]; // level-1-0
      const item2 = action.payload[1]; // level-1-1

      const newWeapons = state.weapons.filter(
        (o) => o !== item1 && o !== item2,
      );

      return {
        ...state,
        weapons: [
          ...newWeapons,
          `level-${Number(item1.slice(6, 7)) + 1}-${_uniqueId()}`,
        ],
      };
    }
    default:
      return state;
  }
};
