import config from '../config.json';

export function generateStages() {
  const stagesSize = new Array(config.stages).fill(null);
  const LevelsSize = new Array(config.levels).fill(null);

  let count = 1;
  return stagesSize.map((_, i) => {
    if (i === 0) {
      return {
        [`stage-${i + 1}`]: {
          [`level-${i + 1}`]: {
            nbMonsters: 1,
          },
        },
      };
    }

    const levels = LevelsSize.map((value, j) => ({
      [`level-${count + j + 1}`]: {
        nbMonsters: config.nbMonster,
      },
    }));
    count += 20;

    return {
      [`stage-${i + 1}`]: {
        ...levels,
      },
    };
  });
}
