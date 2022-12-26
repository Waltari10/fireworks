import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";
// @ts-expect-error
import perlin from "perlin-noise";
import { destroy } from "./main";
import { EXPLOSION_DURATION } from "./constants";
import Color from "color";

const lifeSpanMs = EXPLOSION_DURATION;

const maxLightSize = 500;

export default class ExplosionLight implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
    color,
  }: {
    id: string;
    location: Victor;
    color: Color;
  }) {
    this.createdAt = Date.now();
    this.location = location;
    this.id = id;
    this.color = color;
  }
  location: Victor;
  createdAt: number;
  id: string;
  color: Color;
  size: number = Math.random() * (maxLightSize / 2) + maxLightSize * (1 / 2);

  update(): void {}

  render(): void {
    const timeExisted = Date.now() - this.createdAt;
    const lightSize = this.size - (timeExisted / lifeSpanMs) * this.size;
    const brightness = 1 - timeExisted / lifeSpanMs;

    if (timeExisted > lifeSpanMs || lightSize <= 0) {
      destroy(this);
      return;
    }

    const gradient = ctx.createRadialGradient(
      this.location.x,
      this.location.y,
      lightSize / 50,
      this.location.x,
      this.location.y,
      lightSize / 2
    );

    gradient.addColorStop(0, this.color.alpha(brightness).hexa());
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.location.x - lightSize / 2,
      this.location.y - lightSize / 2,
      lightSize,
      lightSize
    );
  }
}
