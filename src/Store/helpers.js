import config from '../config.json';

export function generateWorld() {
  const StagesSize = new Array(config.stages + 1).fill(null);
  const LevelsSize = new Array(config.levels + 1).fill(null);

  let count = 0;
  return StagesSize.reduce((accStage, _, i) => {
    if (i === 1) {
      count += 1;
      return {
        [`stage-${i}`]: {
          [`level-${i}`]: {
            nbMonsters: 1,
          },
        },
      };
    }

    const levels = LevelsSize.reduce((accLevel, __, j) => ({
      ...accLevel,
      [`level-${count + j}`]: {
        nbMonsters: config.nbMonster,
      },
    }));
    count += config.levels;

    return {
      ...accStage,
      [`stage-${i}`]: {
        ...levels,
      },
    };
  });
}
