import React, { useEffect, useState } from 'react';

export const useCooldown = (cooldownTime = 500) => {
  const [cooledDown, setCooledDown] = useState(true);

  useEffect(() => {
    let cooldownTimer;

    if (!cooledDown) {
      cooldownTimer = setTimeout(() => setCooledDown(true), cooldownTime);
    }
    return () => clearTimeout(cooldownTimer);
  }, [cooledDown, cooldownTime]);

  return [cooledDown, setCooledDown];
};
