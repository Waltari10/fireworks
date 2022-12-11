import Victor from "victor";
import { canvas } from "./canvas";
import GameObject from "./GameObject";
import { instantiate } from "./main";
import Sparkle from "./Sparkle";

export default class SparkleFountain implements GameObject {
  constructor() {
    this.hold = false;

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);

    canvas.addEventListener("mousedown", this.mouseDown);
    canvas.addEventListener("mouseup", this.mouseUp);
    canvas.addEventListener("mousemove", this.mouseMove);
  }

  update(): void {}
  render(): void {}
  location = new Victor(0, 0);

  hold: boolean;

  mouseMove(e: any): void {
    if (this.hold) {
      instantiate(Sparkle, { location: new Victor(e.x, e.y) });
    }
  }

  mouseDown(e: any): void {
    instantiate(Sparkle, { location: new Victor(e.x, e.y) });
    this.hold = true;
  }

  mouseUp(): void {
    this.hold = false;
  }
}
