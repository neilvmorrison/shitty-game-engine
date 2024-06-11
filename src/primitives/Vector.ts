export interface IVector {
  x: number;
  y: number;

  add(vector: Vector): Vector;
  subtract(vector: Vector): Vector;
  dot(vector: Vector): number;
  scalar(scalar: number): Vector;
  normalize(): Vector;
  magnetude(): number;
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

  subtract(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  scalar(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  magnetude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector {
    const magnetude = this.magnetude();
    return new Vector(this.x / magnetude, this.y / magnetude);
  }
}
