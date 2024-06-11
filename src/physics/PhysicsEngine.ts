import { Collider } from "./Collider";
import { RigidBody } from "./RigidBody";

interface IPhysicsEngine {
  useGravity: boolean;
  magnetudeGravity: number;
  objects: Collider[];
}

export type PhysicsEngineInit = {
  useGravity: boolean;
  magnetudeGravity: number;
  objects: Collider[];
};

export class PhysicsEngine implements IPhysicsEngine {
  useGravity: boolean;
  magnetudeGravity: number;
  objects: Collider[];

  constructor({ useGravity, magnetudeGravity, objects }: PhysicsEngineInit) {
    this.useGravity = useGravity;
    this.magnetudeGravity = magnetudeGravity;
    this.objects = objects;
  }

  addObject(object: Collider | RigidBody): void {
    this.objects = [...this.objects, object];
  }
}
