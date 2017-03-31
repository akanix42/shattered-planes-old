'use strict';
import ROT from 'lib/rot-js';
import { IGame } from 'typings/IGame';
import { IStringMap } from "typings/IMap";
import { LevelGenerator } from "generators/ILevelGenerator";

class LevelGeneratorManager {
  static _generators: IStringMap<typeof LevelGenerator> = {};
  _generators: IStringMap<LevelGenerator> = {};

  constructor(private game: IGame) {
    const keys = Object.keys(LevelGeneratorManager._generators);
    keys.forEach(key=> this._generators[key] = new LevelGeneratorManager._generators[key](game));
  }

  addGenerator(generator:LevelGenerator ) {
    this._generators[generator.theme] = generator;
  }

  generateRandom() {
    const generator = this.getRandomGenerator();
    generator.game = this.game;
    return generator.generate();
  }

  getRandomGenerator() {
    const themes = Object.keys(this._generators);
    return this._generators[themes.random()];
  }
}

export default LevelGenerator;
