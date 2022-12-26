import Color from "color";
import Victor from "victor";
import { ctx } from "./canvas";
import DebugDot from "./DebugDot";
import GameObject from "./GameObject";
import { destroy, instantiate, timeDelta } from "./main";
import Spark from "./Spark";

export default class TextScene implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
  }: {
    id: string;
    location: Victor;
  }) {
    this.location = location;
    this.id = id;
  }

  location: Victor;
  id: string;

  timePassed: number = 0;

  update(): void {
    this.timePassed = this.timePassed + timeDelta;
  }

  once = false;

  render(): void {
    this.once = true;
    ctx.strokeStyle = "white";
    ctx.font = "20px serif";
    ctx.strokeText("♥", 10, 30);
    const width = innerWidth;
    const height = innerHeight;
    const imgData = ctx.getImageData(0, 0, width, height);
    const rgba = imgData.data;

    let count = 0;
    const coordinates = [];

    // if (!this.once) {
    for (var px = 0, ct = width * height * 4; px < ct; px += 4) {
      var r = rgba[px];
      var g = rgba[px + 1];
      var b = rgba[px + 2];
      var a = rgba[px + 3];

      const threshold = 50;
      if (r > threshold || g > threshold || b > threshold) {
        count++;
        const x = (px / 4) % width;
        const y = Math.floor(px / 4 / height);

        coordinates.push({ x: x, y });
      }
    }
    console.log({ count, total: width * height }, coordinates);

    coordinates.forEach((coord) => {
      instantiate(DebugDot, {
        location: new Victor(coord.x, 50 + coord.y),
        color: "red",
      });
    });

    instantiate(DebugDot, {
      location: new Victor(17, 50 + 17),
      color: "white",
    });

    const centeredCoords = coordinates.map((coord) => ({
      x: coord.x - 17,
      y: coord.y - 17,
    }));
    console.log("centered", centeredCoords);
  }
}
