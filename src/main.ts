import "./style.css";
import uniqid from "uniqid";
import GameObject from "./GameObject";
import { canvas, ctx } from "./canvas";
import { TARGET_FRAME_DURATION } from "./contants";
import FireworksScene from "./FireworksScene";
import TextScene from "./TextScene";

const gameObjects: Record<string, GameObject> = {};

export let timeDelta = 0;

export const instantiate = function (
  ClassTemplate: GameObject,
  args: any
): GameObject {
  const id = uniqid();
  const instance = new ClassTemplate({ id, ...args });
  gameObjects[id] = instance;
  return instance;
};

export const destroy = function (instance: GameObject): void {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete gameObjects[instance.id];
};

function resizeCanvas(): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();

function draw(): void {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const key in gameObjects) {
    ctx.beginPath();
    ctx.moveTo(
      Math.floor(gameObjects[key].location.x),
      Math.floor(gameObjects[key].location.y)
    );
    gameObjects[key].render();
    ctx.stroke();
  }
}

function updateGameObjects(): void {
  for (const key in gameObjects) {
    gameObjects[key].update();
  }
}

function loop(): void {
  const startTime = Date.now();
  updateGameObjects();
  draw();
  const renderTime = Date.now() - startTime;
  timeDelta =
    renderTime < TARGET_FRAME_DURATION ? TARGET_FRAME_DURATION : renderTime;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document!.getElementById("fpsCounter")!.innerHTML =
    "FPS: " + (1000 / timeDelta).toFixed(1);

  setTimeout(() => {
    loop();
  }, TARGET_FRAME_DURATION - renderTime);
}

const createScene = (): void => {
  instantiate(FireworksScene, {});
  // instantiate(TextScene, {});
};

createScene();
loop();
