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
    direction,
    color,
  }: {
    id: string;
    location: Victor;
    direction: number;
    color: Color;
  }) {
    this.color =
      color ||
      Color({
        r: 255,
        g: 255,
        b: 255,
      });
    this.createdAt = Date.now();
    this.location = location;
    this.id = id;
    this.direction = direction + (Math.random() * Math.PI) / 6 - Math.PI / 12;
  }

  color: Color;
  createdAt: number;
  location: Victor;
  speed: number = Math.random() * 5;
  ySpeed: number = 0;
  slowDownFactor: number = 0.981;

  id: string;
  direction: number;
  update(): void {
    const timeSinceCreationMs = Date.now() - this.createdAt;
    const shouldBeDestroyed = timeSinceCreationMs > lifeSpanMs;

    if (shouldBeDestroyed) {
      destroy(this);
      return;
    }

    this.speed = this.slowDownFactor * this.speed;

    // g gravity
    // s distance
    // t time
    // s = (1/2)gt²
    this.ySpeed =
      0.5 * (GRAVITY * 0.1) * Math.pow(timeSinceCreationMs / 1000, 2);

    const fallDownVector = new Victor(0, this.ySpeed);

    const changePosVector = new Victor(this.speed, 0);
    changePosVector.rotate(this.direction);
    this.location.add(changePosVector);
    this.location.add(fallDownVector);
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
