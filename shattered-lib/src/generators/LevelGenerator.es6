'use strict';
import ROT from 'rot-js';

class LevelGenerator {
  
  addGenerator(generator){
    LevelGenerator._generators[generator.theme] = generator;
  }

  generateRandom() {
    const generator = this.getRandomGenerator();
    return generator.generate();
  }

  getRandomGenerator() {
    const themes = Object.keys(LevelGenerator._generators);
    return LevelGenerator._generators[themes.random()];
  }
}

LevelGenerator._generators = {};

export default LevelGenerator;
