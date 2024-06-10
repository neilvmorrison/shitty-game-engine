import { Engine } from "./primitives/Engine";
import { Vector } from "./primitives/Vector";
import { addVectors } from "./utils/math";

function main(): void {
  const gameEngine = new Engine();
  gameEngine.run();
}

main();
