'use strict';
import ROT from 'rot-js';
import ComponentGenerator from './ComponentGenerator';
import EntityGenerator from './EntityGenerator';
import LevelGenerator from './LevelGenerator';
import Engine from './Engine';
import idGenerator from 'shattered-lib/generators/idGenerator';
import global from './global';

class Game {
  seed = null;
  levels = null;
  engine = null;
  
  start() {
    this.engine.unlock();
  }
}

class GameGenerator {
  LevelGenerator = LevelGenerator;

  generate(options = {}) {
    idGenerator.reset();
    
    const game = new Game();
    global.game = game;
    game.engine = new Engine();
    game.seed = ROT.RNG.seed;
    game.levels = this._generateLevels(options.numberOfLevels || 0);
    return game;
  }

  _generateLevels(numberOfLevels) {
    const levels = {};
    const levelGenerator = new this.LevelGenerator();
    for (var i = 0; i < numberOfLevels; i++) {
      const level = levelGenerator.generateRandom();
      level.id = 1;
      levels[level.id] = level;
    }
    return levels;
  }

}

export default GameGenerator;
