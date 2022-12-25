import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";
// @ts-expect-error
import perlin from "perlin-noise";
import { destroy } from "./main";
import { EXPLOSION_DURATION } from "./constants";

const lifeSpanMs = EXPLOSION_DURATION;
const image = new Image();
image.src = "./light.png";

const maxLightSize = 500;
const initialLightSize =
  Math.random() * (maxLightSize / 2) + maxLightSize * (1 / 2);

export default class ExplosionLight implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
  }: {
    id: string;
    location: Victor;
  }) {
    this.createdAt = Date.now();
    this.location = location;
    this.id = id;
  }
  location: Victor;
  createdAt: number;
  id: string;
  update(): void {}

  render(): void {
    const timeExisted = Date.now() - this.createdAt;
    const lightSize =
      initialLightSize - (timeExisted / lifeSpanMs) * initialLightSize;

    if (timeExisted > lifeSpanMs) {
      destroy(this);
    }

    ctx.drawImage(
      image,
      this.location.x - lightSize / 2,
      this.location.y - lightSize / 2,
      lightSize,
      lightSize
    );
  }
}
