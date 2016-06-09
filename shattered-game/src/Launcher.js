'use strict';
import GameGenerator from './GameGenerator';
import GameLoader from './GameLoader';

class Launcher {
  GameGenerator = GameGenerator;
  GameLoader = GameLoader;
  
  startNewGame() {
    const gameGenerator = new this.GameGenerator();
    gameGenerator.generate();
  }

  loadSavedGame(gameId) {
    const gameLoader = new this.GameLoader();
    gameLoader.load(gameId);
  }
}

export default Launcher;
