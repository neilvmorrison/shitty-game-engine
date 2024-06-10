import { IPhysicalObject, PhysicalObject } from "../primitives/PhysicalObject";
import { Vector } from "../primitives/Vector";
import { CONTROL_INPUT } from "../utils/enums";
import { CONTROL_INPUT_VALUES } from "../utils/types";

export type VehicleInit = {
  initialPosition: Vector;
  power: number;
  mass: number;
  drag: number;
  colorHex: string;
};

export class Vehicle extends PhysicalObject {
  power: number;

  constructor({ initialPosition, power, mass, drag, colorHex }: VehicleInit) {
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
    });
    this.power = power;
  }

  private calculateAccel(): Vector {
    return new Vector(0, 0);
  }

  steer(dt: number, controlInputs: CONTROL_INPUT_VALUES): void {
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(this.drag, this.drag);

    while (controlInputs[CONTROL_INPUT.MOVE_RIGHT]) {
      this.velocity = new Vector(1, 0);
      break;
    }
    while (controlInputs[CONTROL_INPUT.MOVE_LEFT]) {
      this.velocity = new Vector(-1, 0);
      break;
    }
    while (controlInputs[CONTROL_INPUT.MOVE_UP]) {
      this.velocity = new Vector(0, -1);
      break;
    }
    while (controlInputs[CONTROL_INPUT.MOVE_DOWN]) {
      this.velocity = new Vector(0, 1);
      break;
    }

    this.updatePosition(dt);
  }
}
