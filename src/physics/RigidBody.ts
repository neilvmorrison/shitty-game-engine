import { Vector } from "../primitives/Vector";
import { Collider, ICollider, InitCollider } from "./Collider";

export interface IRigidBody extends ICollider {
  mass: number;
  velocity: Vector;
  acceleration: Vector;
}

export type InitRigidBody = {
  initialPosition: Vector;
  initialVelocity: Vector;
  initialAcceleration: Vector;
  mass: number;
  velocity: Vector;
  acceleration: Vector;
  height: number;
  width: number;
};

export class RigidBody extends Collider {
  mass: number;
  velocity: Vector;
  acceleration: Vector;

  constructor({
    initialPosition,
    height,
    width,
    mass,
    initialVelocity,
    initialAcceleration,
  }: InitRigidBody) {
    super({
      initialPosition,
      height,
      width,
    });
    this.mass = mass;
    this.velocity = initialVelocity;
    this.acceleration = initialAcceleration;
  }
}
