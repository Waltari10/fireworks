import Color from "color";

export const EXPLOSION_DURATION = 2000;
export const GRAVITY = 9.81;

const hslColors = new Array(100)
  .fill(0)
  .map(() =>
    Color([
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ]).saturate(100)
  );

console.log(hslColors.map((c) => c.hexa()));

export const COLORS = [...hslColors];
