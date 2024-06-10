import { Engine } from "./primitives/Engine";
import { Vector } from "./primitives/Vector";
import { addVectors } from "./utils/math";

function main(): void {
  const vec = new Vector(1, 1);
  const gameEngine = new Engine();
  gameEngine.run();
}

main();
