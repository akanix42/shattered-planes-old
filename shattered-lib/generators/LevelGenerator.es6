'use strict';
import ROT from 'rot-js';

class LevelGenerator {
  _generators = {};

  constructor(game = {}) {
    this._game = game;
    const keys = Object.keys(LevelGenerator._generators);
    keys.forEach(key=> this._generators[key] = new LevelGenerator._generators[key](game));
  }

  addGenerator(generator) {
    this._generators[generator.theme] = generator;
  }

  generateRandom() {
    const generator = this.getRandomGenerator();
    generator.game = this._game;
    return generator.generate();
  }

  getRandomGenerator() {
    const themes = Object.keys(this._generators);
    return this._generators[themes.random()];
  }
}

LevelGenerator._generators = {};

export default LevelGenerator;
