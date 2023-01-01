import { uniq } from "lodash";
import Victor from "victor";
import FireworksScene from "./FireworksScene";
import GameObject from "./GameObject";
import { instantiate } from "./main";
import TextScene from "./TextScene";

// NOTE: Emojis don't work
const msg = "HYVÄÄ UUTTA VUOTTA ♥";

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

    this.textSceneInstance = instantiate(TextScene, {
      textToParse: uniq(msg.split("")).join(""),
    });
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
