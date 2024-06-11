import { CONTROL_INPUT } from "./enums";

export type CONTROL_INPUT_VALUES = {
  [CONTROL_INPUT.MOVE_DOWN]: boolean;
  [CONTROL_INPUT.MOVE_UP]: boolean;
  [CONTROL_INPUT.MOVE_LEFT]: boolean;
  [CONTROL_INPUT.MOVE_RIGHT]: boolean;
  [CONTROL_INPUT.SPACE_BAR]: boolean;
};
