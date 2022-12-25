import Victor from "victor";
import GameObject from "./GameObject";
import { instantiate, timeDelta } from "./main";
import Rocket from "./Rocket";

export default class FireworksScene implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
  }: {
    id: string;
    location: Victor;
  }) {
    this.location = location;
    this.id = id;

    setInterval(() => {
      instantiate(Rocket, {
        location: new Victor(window.innerWidth / 2, window.innerHeight),
        direction: -Math.PI / 2,
      });
    }, 2000);
  }

  location: Victor;
  id: string;

  timePassed: number = 0;

  update(): void {
    this.timePassed = this.timePassed + timeDelta;
  }

  render(): void {}
}
