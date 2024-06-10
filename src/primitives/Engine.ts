import { Ball } from "../objects/Ball";
import { Vehicle } from "../objects/Vehicle";
import { CONTROL_INPUT } from "../utils/enums";
import { CONTROL_INPUT_VALUES } from "../utils/types";
import { Vector } from "./Vector";

interface IEngine {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  pause: boolean;
  controlInputs: CONTROL_INPUT_VALUES;
  run(): void;
}

export class Engine implements IEngine {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  pause: boolean;
  controlInputs: CONTROL_INPUT_VALUES;
  private playerVehicle: Vehicle;
  private ball: Ball;
  private playerSpawn: Vector;
  private lastTime: number = 0;

  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!;
    this.pause = false;
    this.controlInputs = {
      [CONTROL_INPUT.MOVE_DOWN]: false,
      [CONTROL_INPUT.MOVE_UP]: false,
      [CONTROL_INPUT.MOVE_LEFT]: false,
      [CONTROL_INPUT.MOVE_RIGHT]: false,
    };
    this.playerSpawn = new Vector(0, 0);
    this.playerVehicle = new Vehicle({
      initialPosition: this.playerSpawn,
      power: 320,
      mass: 1000,
      drag: 0.5,
      colorHex: "#ff4a55",
    });
    this.ball = new Ball({
      position: new Vector(this.canvas.height / 2, this.canvas.height / 2),
      mass: 10,
      drag: 0,
      colorHex: "#55a4ff",
    });
    this.initialize();
  }

  private assignControlInputValue(controlInput: string, value: boolean): void {
    let newInputs = { ...this.controlInputs };
    switch (controlInput) {
      case "ArrowDown":
        newInputs[CONTROL_INPUT.MOVE_DOWN] = value;
        this.controlInputs = newInputs;
        break;
      case "ArrowUp":
        newInputs[CONTROL_INPUT.MOVE_UP] = value;
        this.controlInputs = newInputs;
        break;
      case "ArrowLeft":
        newInputs[CONTROL_INPUT.MOVE_LEFT] = value;
        this.controlInputs = newInputs;
        break;
      case "ArrowRight":
        newInputs[CONTROL_INPUT.MOVE_RIGHT] = value;
        this.controlInputs = newInputs;
        break;
      case "Escape":
        this.pause = true;
        break;
    }
  }

  private setupControlInputs() {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      this.assignControlInputValue(event.key, true);
    });
    window.addEventListener("keyup", (event: KeyboardEvent) => {
      this.assignControlInputValue(event.key, false);
    });
  }

  private checkCollisions() {
    const isCollision =
      this.playerVehicle.isCollidingWithObject(this.ball) ||
      this.ball.isCollidingWithObject(this.playerVehicle);

    return {
      isCollision,
    };
  }

  private update(dt: number): void {
    const { isCollision } = this.checkCollisions();
    if (!isCollision) {
      this.playerVehicle.steer(dt, this.controlInputs);
      this.ball.updatePosition(dt);
      return;
    }
  }

  private gameLoop(timestamp: number) {
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }
  private render() {
    this.context.fillStyle = "#fff";
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.playerVehicle.render(this.context);
    this.ball.render(this.context);
  }

  private initialize(): void {
    this.setupControlInputs();
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  run(): void {}
}
