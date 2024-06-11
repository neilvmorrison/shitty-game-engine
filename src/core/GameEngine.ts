interface IGameEngine {
  initialize(): void;
  run(): void;
  gameState: any;
}

export class Engine implements IGameEngine {
  gameState: any;

  initialize(): void {}

  run(): void {}
}
