import {
  PhysicalObjectInit,
  PhysicalObject,
} from "../primitives/PhysicalObject";
import { Vector } from "../primitives/Vector";

export type BallInit = {
  position: Vector;
  mass: number;
  drag: number;
  colorHex: string;
  power: number;
};

export class Ball extends PhysicalObject {
  constructor({ position, mass, drag, colorHex, power }: BallInit) {
    const [initialVelocity, initialAcceleration] = [
      new Vector(0, 0),
      new Vector(0, 0),
    ];
    super({
      position,
      velocity: initialVelocity,
      acceleration: initialAcceleration,
      mass,
      width: 15,
      height: 15,
      drag,
      colorHex,
      power,
    });
  }
}
