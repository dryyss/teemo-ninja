import _uniqueId from 'lodash/uniqueId';
import { ADD_WEAPON, MERGE_WEAPONS } from '../../../contants';

const initialState = {
  craftMax: 5,
  bagSize: 10,
  weapons: [],
  mouse: {},
};

export const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WEAPON:
      return {
        ...state,
        weapons: [...state.weapons, `level-1-${_uniqueId()}`],
      };
    case MERGE_WEAPONS: {
      const { item1, item2, pos } = action.payload;
      const newWeapons = state.weapons.filter(
        (o) => o !== item1 && o !== item2,
      );

      return {
        ...state,
        weapons: [
          ...newWeapons,
          `level-${Number(item1.slice(6, 7)) + 1}-${_uniqueId()}|${pos.x}:${
            pos.y
          }`,
        ],
      };
    }
    default:
      return state;
  }
};
