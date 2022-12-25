import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";

export class Star implements GameObject {
  constructor({ id }) {
    this.id = id;
    this.location = new Victor(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
  }
  id: string;
  location: Victor;
  render() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.rect(this.location.x, this.location.y, 0.1, 0.1);
  }
  update() {}
}
