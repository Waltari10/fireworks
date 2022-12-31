import Victor from "victor";
import GameObject from "./GameObject";
import { instantiate, timeDelta } from "./main";
import Rocket from "./Rocket";
import { Star } from "./Star";

export default class FireworksScene implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
    message,
  }: {
    id: string;
    location: Victor;
    message: string;
  }) {
    this.location = location;
    this.id = id;
    this.message = message;

    let i = 1000;
    while (i--) {
      instantiate(Star, {});
    }

    const splitMsg = message.split(" ");

    splitMsg.forEach((msgPart, i) => {
      const trimmedMsgPart = msgPart.trim();
      setTimeout(() => {
        for (let i = 0; i < trimmedMsgPart.length; i++) {
          const char = trimmedMsgPart[i];
          const width = window.innerWidth * 0.9;

          const charWidth = 100;
          const msgWidth = trimmedMsgPart.length * charWidth;

          instantiate(Rocket, {
            char,
            location: new Victor(
              width / 2 - msgWidth / 2 + i * charWidth + width * 0.1,
              window.innerHeight
            ),
            direction: -Math.PI / 2,
          });
        }
      }, 4000 * i);
    });
  }

  message: string;
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
