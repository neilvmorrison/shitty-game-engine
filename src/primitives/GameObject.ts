import { v4 } from "uuid";

export interface IGameObject {
  id: string;
}

export class GameObject implements IGameObject {
  id: string;

  constructor() {
    this.id = v4();
  }
}
