'use strict';
import ROT from 'rot-js';

class LevelGenerator {
  _generators = {};

  addGenerator(generator){
    this._generators[generator.theme] = generator;
  }

  generateRandom() {
    const generator = this.getRandomGenerator();
    return generator.generate();
  }

  getRandomGenerator() {
    const themes = Object.keys(this._generators);
    return this._generators[themes.random()];
  }
}

export default LevelGenerator;
