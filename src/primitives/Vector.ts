export interface IVector {
  x: number;
  y: number;
  add(vector: Vector): Vector;
  scale(factor: number): Vector;
  dot(vector: Vector): number;
  subtract(vector: Vector): Vector;
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

  scale(factor: number): Vector {
    return new Vector(this.x * factor, this.y * factor);
  }

  dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  magnetude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector {
    const mangnetude = this.magnetude();
    return new Vector(this.x / mangnetude, this.y / mangnetude);
  }
}
