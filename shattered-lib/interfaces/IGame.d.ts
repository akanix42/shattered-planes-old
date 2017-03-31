import Level from 'Level.js';
import { IEngine } from "typings/IEngine";
import { IStringMap } from "typings/IMap";

declare interface IGame {
  seed: number;
  levels: IStringMap<Level> | null;
  engine: IEngine | null;
  componentGenerator: IPlaceholder | null;

  start(): void;

  save(): void;
}
