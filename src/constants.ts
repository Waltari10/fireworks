import Color from "color";

export const EXPLOSION_DURATION = 2000;
export const GRAVITY = 9.81;

const colors = new Array(200)
  .fill(0)
  .map(() =>
    Color([
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ]).saturate(100)
  )
  .filter((c) => c.contrast(Color("black")) > 7);

export const COLORS = [...colors];
