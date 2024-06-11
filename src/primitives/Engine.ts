import { Ball } from "../objects/Ball";
import { Vehicle } from "../objects/Vehicle";
import { CONTROL_INPUT } from "../utils/enums";
import { CONTROL_INPUT_VALUES } from "../utils/types";
import { PhysicalObject } from "./PhysicalObject";
import { Vector } from "./Vector";

interface IEngine {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  pause: boolean;
  controlInputs: CONTROL_INPUT_VALUES;
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
      [CONTROL_INPUT.SPACE_BAR]: false,
    };
    this.playerSpawn = new Vector(0, 0);
    this.playerVehicle = new Vehicle({
      initialPosition: this.playerSpawn,
      power: 320,
      mass: 1000,
      drag: 9.75,
      colorHex: "#ff4a55",
      health: 100,
    });
    this.ball = new Ball({
      position: new Vector(this.canvas.width / 2, this.canvas.height / 2),
      mass: 10,
      drag: 1,
      colorHex: "#55a4ff",
      power: 0,
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
      case "Space":
        newInputs[CONTROL_INPUT.SPACE_BAR] = value;
        this.controlInputs = newInputs;
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

  private solveElasticCollisions(
    object1: PhysicalObject,
    object2: PhysicalObject
  ): { res1: Vector; res2: Vector } {
    const lineOfImpact = object1.position
      .subtract(object2.position)
      .normalize();
    const v_rel = object1.velocity.subtract(object2.velocity);
    const v_rel_n = v_rel.dot(lineOfImpact);
    const J = (2 * v_rel_n) / (1 / object1.mass + 1 / object2.mass);
    const deltaVA = lineOfImpact.scale(-J / object1.mass);
    const deltaVB = lineOfImpact.scale(J / object2.mass);

    const vAFinal = object1.velocity.add(deltaVA);
    const vBFinal = object2.velocity.add(deltaVB);
    return {
      res1: vAFinal,
      res2: vBFinal,
    };
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
    const { res1, res2 } = this.solveElasticCollisions(
      this.playerVehicle,
      this.ball
    );
    this.playerVehicle.velocity = res1;
    this.ball.velocity = res2;

    this.playerVehicle.updatePosition(dt);
    this.ball.updatePosition(dt);
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
}
