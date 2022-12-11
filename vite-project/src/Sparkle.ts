import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";
// @ts-expect-error
import perlin from "perlin-noise";
import { destroy, timeDelta } from "./main";
import { TARGET_FRAME_DURATION } from "./contants";

import Color from "color";

const lifeSpanMs = 5000;
const pathLength = lifeSpanMs / TARGET_FRAME_DURATION;

const createPath = (): number[] => {
  const options = {
    octaveCount: 0, // 4 defaults
    amplitude: 5000, // 0.1
    persistence: 0.0, // 0.2
  };
  return perlin.generatePerlinNoise(pathLength, 1, options);
};

export default class Sparkle implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
  }: {
    id: string;
    location: Victor;
    direction: number;
  }) {
    this.createdAt = Date.now();
    this.path = createPath();
    this.location = location;
    this.id = id;
    this.direction = Math.PI * 2 * Math.random();
    this.color = Color({
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    });
    this.history = [];
  }

  history: Victor[];

  color: Color;
  createdAt: number;
  path: number[];
  location: Victor;

  id: string;
  direction: number;
  update(): void {
    const timeSinceCreationMs = Date.now() - this.createdAt;
    const shouldBeDestroyed = timeSinceCreationMs > lifeSpanMs;

    if (shouldBeDestroyed) {
      destroy(this);
      return;
    }

    const pathIndex = Math.min(
      Math.floor(timeSinceCreationMs / timeDelta),
      this.path.length
    );

    const speed = 2;
    const locationChangeVector = new Victor(speed * this.path[pathIndex], 1);
    locationChangeVector.rotate(this.direction);

    this.location.add(locationChangeVector);

    const timeLeft = lifeSpanMs - timeSinceCreationMs;

    const newColor = this.color
      .rotate(timeDelta / 3)
      .alpha(timeLeft / (lifeSpanMs / 5));

    this.color = newColor;

    this.history.push(this.location.clone());
  }

  render(): void {
    const hexaColor = this.color.hexa();

    ctx.strokeStyle = hexaColor;
    ctx.fillStyle = hexaColor;
    this.history.forEach((location) => {
      ctx.rect(location.x, location.y, 1, 1);
    });

    ctx.rect(this.location.x, this.location.y, 1, 1);
  }
}
