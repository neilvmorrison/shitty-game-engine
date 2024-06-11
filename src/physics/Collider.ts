import { v4 } from "uuid";
import { GameObject } from "../core/GameObject";
import { Vector } from "../primitives/Vector";

export interface ICollider {
  id: string;
  position: Vector;
  width: number;
  height: number;

  intersects(collider: Collider): boolean;
}

export type InitCollider = {
  initialPosition: Vector;
  width: number;
  height: number;
};

export class Collider implements ICollider {
  id: string;
  position: Vector;
  width: number;
  height: number;

  constructor({ initialPosition, width, height }: InitCollider) {
    this.position = initialPosition;
    this.width = width;
    this.height = height;
    this.id = v4();
  }

  intersects(collider: Collider): boolean {
    // detect collisions;
    return false;
  }
}
