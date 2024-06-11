import { v4 } from "uuid";
import { Vector } from "../primitives/Vector";

interface IGameObject {
  id: string;
}

export class GameObject implements IGameObject {
  id: string;

  constructor() {
    this.id = v4();
  }
}
