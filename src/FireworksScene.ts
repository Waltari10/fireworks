import Victor from "victor";
import GameObject from "./GameObject";
import { instantiate, timeDelta } from "./main";
import Rocket from "./Rocket";
import { Star } from "./Star";

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

    this.launchRocket();

    let i = 1000;
    while (i--) {
      instantiate(Star, {});
    }
  }

  location: Victor;
  id: string;

  timePassed: number = 0;

  update(): void {
    this.timePassed = this.timePassed + timeDelta;
  }

  launchRocket() {
    setTimeout(() => {
      const width = window.innerWidth;

      instantiate(Rocket, {
        location: new Victor(
          width * 0.1 + Math.random() * width * 0.8,

          window.innerHeight
        ),
        direction: -Math.PI / 2,
      });
      this.launchRocket();
    }, Math.random() * 2000 + 200);
  }

  render(): void {}
}
