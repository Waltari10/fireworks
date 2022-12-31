import Victor from "victor";
import { ctx } from "./canvas";
import GameObject from "./GameObject";
import { destroy } from "./main";

export default class TextScene implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
    textToParse,
  }: {
    id: string;
    location: Victor;
    textToParse: string;
  }) {
    this.location = location;
    this.id = id;
    this.textToParse = textToParse;
  }

  location: Victor;
  id: string;
  textToParse: string = "";
  currentChar: string = "";

  timePassed: number = 0;

  update(): void {}

  render(): void {
    if (this.textToParse.length === 0) {
      destroy(this);
      return;
    }
    const char = this.textToParse[0];
    this.textToParse = this.textToParse.substring(1);

    // if (localStorage.getItem(char) !== null) {
    //   window.parsingTextDone = true;
    //   return;
    // }

    ctx.strokeStyle = "white";
    ctx.font = "8px serif";
    ctx.strokeText(char, 10, 30);
    const width = innerWidth;
    const height = innerHeight;
    const imgData = ctx.getImageData(0, 0, width, height);
    const rgba = imgData.data;

    const coordinates = [];

    for (let px = 0, ct = width * height * 4; px < ct; px += 4) {
      const r = rgba[px];
      const g = rgba[px + 1];
      const b = rgba[px + 2];

      const threshold = 50;
      if (r > threshold || g > threshold || b > threshold) {
        const x = (px / 4) % width;
        const y = Math.floor(px / 4 / height);

        coordinates.push({ x, y });
      }
    }

    const xAverage =
      coordinates.reduce((prev, curr) => prev + curr.x, 0) / coordinates.length;

    const yAverage =
      coordinates.reduce((prev, curr) => prev + curr.y, 0) / coordinates.length;

    const centeredCoords = coordinates.map((coord) => ({
      x: coord.x - xAverage, // 17
      y: coord.y - yAverage, // 17
    }));

    localStorage.setItem(char, JSON.stringify(centeredCoords));
  }
}
