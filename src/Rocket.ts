import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";
// @ts-expect-error
import perlin from "perlin-noise";
import { destroy, instantiate, timeDelta } from "./main";
import { TARGET_FRAME_DURATION } from "./contants";
import _ from "lodash";

import Color from "color";
import Sparkle from "./Sparkle";
import ExplosionLight from "./ExplosionLight";
import Spark from "./Spark";
import { COLORS } from "./constants";

const lifeSpanMs = 2500;
const pathLength = lifeSpanMs / TARGET_FRAME_DURATION;

const createPath = (): number[] => {
  const options = {
    octaveCount: 4, // 4 defaults
    amplitude: 1, // 0.1
    persistence: 0.2, // 0.2
  };
  return perlin.generatePerlinNoise(pathLength, 1, options);
};

const maxSpeed = 12;

export default class Rocket implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
    direction,
  }: {
    id: string;
    location: Victor;
    direction: number;
  }) {
    this.createdAt = Date.now();
    this.path = createPath();
    this.location = location;
    this.id = id;
    this.direction = direction;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.history = [];
    this.speed = (Math.random() * maxSpeed) / 3 + (maxSpeed * 2) / 3;
  }

  history: Victor[];

  speed: number;
  color: Color;
  createdAt: number;
  path: number[];
  location: Victor;
  hasExploded: boolean = false;

  id: string;
  direction: number;
  initialSpeed = maxSpeed;
  size = Math.random() * 80 + 20;
  slowDownFactor = 0.98; // TODO: Adjust based on screen height to stop at middle of screen
  update(): void {
    const timeSinceCreationMs = Date.now() - this.createdAt;
    const shouldBeDestroyed = timeSinceCreationMs > lifeSpanMs;

    if (shouldBeDestroyed) {
      this.explode();
      return;
    }

    instantiate(Spark, {
      location: this.location.clone(),
      direction: this.direction + Math.PI,
      color: this.color,
    });

    const pathIndex = Math.min(
      Math.floor(timeSinceCreationMs / timeDelta),
      this.path.length
    );

    this.speed = this.speed * this.slowDownFactor;
    const forwardSpeed = this.speed * this.slowDownFactor;
    const sidewaysSpeed = 5;

    const forwardVector = new Victor(
      forwardSpeed,
      (sidewaysSpeed * (this.path[pathIndex] - 0.5) * this.speed) / maxSpeed
    );

    forwardVector.rotate(this.direction);

    this.location.add(forwardVector);

    const timeLeft = lifeSpanMs - timeSinceCreationMs;

    const newColor = this.color.alpha(timeLeft / (lifeSpanMs / 5));

    this.color = newColor;

    this.history.push(this.location.clone());
  }

  render(): void {
    const brightness = this.speed / maxSpeed;
    const lightSize = this.size * brightness;

    const gradient = ctx.createRadialGradient(
      this.location.x,
      this.location.y,
      lightSize / 50,
      this.location.x,
      this.location.y,
      lightSize / 2
    );

    gradient.addColorStop(0, this.color.alpha(1).hexa());
    gradient.addColorStop(0.1, this.color.alpha(1).hexa());
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.location.x - lightSize / 2,
      this.location.y - lightSize / 2,
      lightSize,
      lightSize
    );

    const hexaColor = this.color.alpha(brightness).hexa();

    ctx.strokeStyle = hexaColor;
    ctx.fillStyle = hexaColor;
    ctx.beginPath();

    const tailLength = 25;

    let startIndex = this.history.length - tailLength;

    if (startIndex > 0) {
      ctx.moveTo(this.history[startIndex].x, this.history[startIndex].y);
    } else {
      startIndex = 0;
    }

    this.history
      .slice(this.history.length - tailLength, this.history.length - 1)
      .forEach((location) => {
        ctx.lineTo(location.x, location.y);
      });
  }

  explode() {
    for (let i = 0; i < 25; i++) {
      instantiate(Sparkle, { location: this.location.clone() });
    }
    for (let i = 0; i < Math.PI * 2; i = i + Math.random() * (Math.PI / 100)) {
      instantiate(Spark, {
        speed: this.size / 15 + Math.random() / 3,
        location: this.location.clone(),
        direction: i,
        color: this.color,
      });
      instantiate(Spark, {
        speed: (this.size / 15) * Math.random(),
        location: this.location.clone(),
        direction: i,
        color: this.color,
      });
    }
    instantiate(ExplosionLight, {
      location: this.location.clone(),
      color: this.color,
    });
    destroy(this);
  }
}
