import { Vector } from "../primitives/Vector";

export function addVectors(args: Vector[]): Vector {
  const { x, y } = args.reduce(
    (acc, next) => ({ x: (acc.x += next.x), y: (acc.y += next.y) }),
    { x: 0, y: 0 }
  );
  return new Vector(x, y);
}
