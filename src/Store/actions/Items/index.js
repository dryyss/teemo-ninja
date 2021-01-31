import { ADD_WEAPON, MERGE_WEAPONS } from '../../../contants';

export const addWeapon = () => ({
  type: ADD_WEAPON,
});

export const mergeWeapons = (payload) => ({
  type: MERGE_WEAPONS,
  payload,
});
