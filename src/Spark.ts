import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";
// @ts-expect-error
import perlin from "perlin-noise";
import { destroy } from "./main";
import Color from "color";
import { EXPLOSION_DURATION, GRAVITY } from "./constants";

const lifeSpanMs = EXPLOSION_DURATION;

export default class Spark implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
    color,
    speed,
  }: {
    id: string;
    location: Victor;
    color: Color;
    speed: Victor;
  }) {
    this.color =
      color ||
      Color({
        r: 255,
        g: 255,
        b: 255,
      });
    this.speed = speed;
    this.createdAt = Date.now();
    this.location = location;
    this.id = id;
  }

  color: Color;
  createdAt: number;
  location: Victor;
  speed: Victor;
  slowDownFactor: number = 0.981;

  id: string;
  update(): void {
    const timeSinceCreationMs = Date.now() - this.createdAt;
    const shouldBeDestroyed = timeSinceCreationMs > lifeSpanMs;

    if (shouldBeDestroyed) {
      destroy(this);
      return;
    }

    this.speed = this.speed.multiplyScalar(this.slowDownFactor);

    // g gravity
    // s distance
    // t time
    // s = (1/2)gt²
    this.speed = new Victor(
      this.speed.x,
      this.speed.y +
        0.5 * (GRAVITY * 0.009) * Math.pow(timeSinceCreationMs / 1000, 2)
    );

    this.location.add(this.speed);
  }

  render(): void {
    const timeSinceCreationMs = Date.now() - this.createdAt;
    const timeLeft = lifeSpanMs - timeSinceCreationMs;
    const newColor = this.color.alpha(timeLeft / (lifeSpanMs / 5));
    this.color = newColor;

    const hexaColor = this.color.hexa();

    ctx.strokeStyle = hexaColor;
    ctx.fillStyle = hexaColor;
    ctx.beginPath();

    ctx.moveTo(this.location.x, this.location.y);

    ctx.lineTo(this.location.x + 1, this.location.y + 1);
  }
}
