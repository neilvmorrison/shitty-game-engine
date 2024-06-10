export interface IVector {
  x: number;
  y: number;
  add(vector: Vector): Vector;
  scale(factor: number): Vector;
  multiply(vector: Vector): Vector;
}

export class Vector implements IVector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  scale(factor: number): Vector {
    return new Vector(this.x * factor, this.y * factor);
  }

  multiply(vector: Vector): Vector {
    return new Vector(this.x * vector.x, this.y * vector.y);
  }
}
