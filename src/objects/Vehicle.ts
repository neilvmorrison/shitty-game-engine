import { PhysicalObject } from "../primitives/PhysicalObject";
import { Vector } from "../primitives/Vector";
import { CONTROL_INPUT } from "../utils/enums";
import { CONTROL_INPUT_VALUES } from "../utils/types";

export type VehicleInit = {
  initialPosition: Vector;
  power: number;
  mass: number;
  drag: number;
  health: number;
  colorHex: string;
};

export class Vehicle extends PhysicalObject {
  health: number;
  constructor({
    initialPosition,
    power,
    mass,
    drag,
    colorHex,
    health,
  }: VehicleInit) {
    const [initialVelocity, initialAcceleration] = [
      new Vector(0, 0),
      new Vector(0, 0),
    ];
    super({
      position: initialPosition,
      velocity: initialVelocity,
      acceleration: initialAcceleration,
      mass,
      width: 50,
      height: 50,
      drag,
      colorHex,
      power,
    });
    this.health = health;
  }

  steer(dt: number, controlInputs: CONTROL_INPUT_VALUES): void {
    this.acceleration = new Vector(0, 0);

    while (controlInputs[CONTROL_INPUT.MOVE_RIGHT]) {
      this.acceleration = new Vector(1000, 0);
      break;
    }
    while (controlInputs[CONTROL_INPUT.MOVE_LEFT]) {
      this.acceleration = new Vector(-1000, 0);
      break;
    }
    while (controlInputs[CONTROL_INPUT.MOVE_UP]) {
      this.acceleration = new Vector(0, -1000);
      break;
    }
    while (controlInputs[CONTROL_INPUT.MOVE_DOWN]) {
      this.acceleration = new Vector(0, 1000);
      break;
    }

    this.updatePosition(dt);
  }

  takeDamage(damageVal: number): void {
    this.health = this.health - damageVal;
  }
}
