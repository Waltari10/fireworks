import Color from "color";
import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";

export default class DebugDot implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
    color,
  }: {
    id: string;
    location: Victor;
    color: string;
  }) {
    this.createdAt = Date.now();
    this.location = location;
    this.id = id;
    this.color = color ?? "white";
  }

  color: string;
  createdAt: number;
  location: Victor;
  id: string;
  update(): void {}

  render(): void {
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.moveTo(this.location.x, this.location.y);

    ctx.lineTo(this.location.x + 1, this.location.y + 1);
  }
}
