import { Vector } from "../primitives/Vector";
import { GameObject } from "./GameObject";

export interface IScene {
  playerObjects: GameObject[];
  opponents: GameObject[];
  level: number;
  coordinates: Vector[];
}

export type SceneInit = {
  playerObjects: GameObject[];
  opponents: GameObject[];
  level: number;
  coordinates: Vector[];
};

export class Scene implements IScene {
  playerObjects: GameObject[];
  opponents: GameObject[];
  level: number;
  coordinates: Vector[];

  constructor({ playerObjects, opponents, level, coordinates }: SceneInit) {
    this.playerObjects = playerObjects;
    this.opponents = opponents;
    this.level = level;
    this.coordinates = coordinates;
  }
}
