import Victor from "victor";
import FireworksScene from "./FireworksScene";
import GameObject from "./GameObject";
import { instantiate } from "./main";
import TextScene from "./TextScene";

const msg = "HYVÄÄ";

export default class SceneSwapper implements GameObject {
  constructor({
    id,
    location = new Victor(0, 0),
  }: {
    id: string;
    location: Victor;
  }) {
    this.location = location;
    this.id = id;

    this.textSceneInstance = instantiate(TextScene, { textToParse: msg });
  }

  textSceneInstance: GameObject;
  location: Victor;
  id: string;

  update(): void {}

  once: boolean = false;

  render(): void {
    if (!this.once && !this.textSceneInstance.textToParse) {
      this.once = true;
      instantiate(FireworksScene, { message: msg });
    }
  }
}
