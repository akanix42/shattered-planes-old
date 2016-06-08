import ROT from 'rot-js';
import LevelGenerator from './LevelGenerator';

class Game {
  seed = null;
  levels = null;
}

class GameGenerator {
  LevelGenerator = LevelGenerator;
  generate(options={}) {
    const game = new Game();
    game.seed = ROT.RNG.seed;
    game.levels = this._generateLevels(options.numberOfLevels||0);
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
