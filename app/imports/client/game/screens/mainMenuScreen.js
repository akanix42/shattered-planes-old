import {createDisplay} from '../display';
import inGameScreen from './inGameScreen';
import GameGenerator from 'shattered-game/GameGenerator';
import Screen from './Screen';
import ROT from 'rot-js';
import events from 'shattered-game/events';

class MainMenuScreen extends Screen {
  _display = createDisplay();
  _keyMap = this._getKeyMap();

  handleInput(inputType, inputData) {
    var command = this._keyMap[inputType][inputData.keyCode];
    if (!command) return;

    if (typeof command === 'function')
      command = command();
    if (command)
      gameInput.add(command);
  }

  render() {
    this._display.drawText(5, 2, 'Welcome to the Shattered Realms');
    this._display.drawText(5, 6, 'Press [Enter]┐ to start!');
  }

  _getKeyMap() {
    const keyMap = {keydown: {}, keyup: {}, keypress: {}};
    const keydown = keyMap.keydown,
      keyup = keyMap.keyup;

    keydown[ROT.VK_L] = loadGameCommand.bind(this);
    keydown[ROT.VK_N] = newGameCommand.bind(this);

    return keyMap;

    function newGameCommand() {
      inGameScreen.init();
      const gameGenerator = new GameGenerator();
      const game = gameGenerator.generate({numberOfLevels: 1});
      inGameScreen.load(game);
      inGameScreen.show();

      const player = game.entityGenerator.generateByName('player');

      player.emit({name: events.onPosition, destination: game.levels[1].getTileAt({x: 0, y: 0})});

      game.start();
    }

    function loadGameCommand() {
      inGameScreen.init();
      inGameScreen.show();
      const gameGenerator = new GameGenerator();
      const game = gameGenerator.load();
      inGameScreen.load(game);

      game.start();
    }
  }

}

export default new MainMenuScreen();

