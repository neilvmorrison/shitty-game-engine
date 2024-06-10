import { addVectors } from "../utils/math";
import { Vector } from "./Vector";

export interface IPhysicalObject {
  position: Vector; // x,y coordinates
  velocity: Vector;
  acceleration: Vector;
  momentum: Vector; // computed property
  height: number;
  width: number;
  drag: number;

  updatePosition(dt: number): void;
  render(context: CanvasRenderingContext2D): void;
  isCollidingWithObject(object: IPhysicalObject): boolean;
}

export type PhysicalObjectInit = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  mass: number;
  height: number;
  width: number;
  drag: number;
  colorHex: string;
};

export class PhysicalObject implements IPhysicalObject {
  position: Vector; // x,y coordinates
  velocity: Vector;
  acceleration: Vector;
  momentum: Vector;
  mass: number;
  height: number;
  width: number;
  drag: number;
  colorHex: string;

  constructor({
    position: initialPosition,
    velocity: initialVelocity,
    acceleration: initialAcceleration,
    mass,
    height,
    width,
    drag,
    colorHex = "#ff4a55",
  }: PhysicalObjectInit) {
    this.position = initialPosition;
    this.velocity = initialVelocity;
    this.acceleration = initialAcceleration;
    this.mass = mass;
    this.momentum = this.velocity.scale(mass);
    this.height = height;
    this.width = width;
    this.colorHex = colorHex;
    this.drag = drag;
  }

  private solvePositionEquation(dt: number) {
    let velocity = this.velocity;
    let position = this.position;

    // const dragForce = 0.5 * dragCoefficient * Math.pow(velocity, 2);
    // const thrustForce = power / velocity;
    // const netForce = thrustForce - dragForce;
    const acceleration = this.acceleration.scale(100 / 1000);

    this.velocity = this.velocity.add(acceleration.scale(dt));
    position = position.add(velocity.scale(dt));

    this.position = position;
  }

  updatePosition(dt: number): void {
    this.solvePositionEquation(dt);
  }

  isCollidingWithObject(object: IPhysicalObject): boolean {
    const { x, y } = this.position;
    return (
      x < object.position.x + Number(object.width) &&
      x + Number(object.width) > object.position.x &&
      y < object.position.y + Number(object.height) &&
      y + this.height > object.position.y
    );
  }

  render(context: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    context.fillStyle = this.colorHex;
    context.fillRect(x, y, this.width, this.height);
  }
}
