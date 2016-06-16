import display from './display';
import gameInput from './game-input';
import global from 'shattered-game/global';
import gameCommands from './game-commands';
import ROT from 'rot-js';


class InGameScreen {
  game = null;
  _keyMap = getKeyMap.call(this);

  load(game) {
    this.game = game;
    global.screen = this;
    game.start();
  }

  render(gameState) {
    console.log('render!')
  }

  handleInput(inputType, inputData) {
    var command = this._keyMap[inputType][inputData.keyCode];
    if (!command) return;

    if (typeof command === 'function')
      command = command();
    if (command)
      gameInput.add(command);
  }
}

export default new InGameScreen();

function getKeyMap() {
  const keyMap = {keydown: {}, keyup: {}, keypress: {}};
  const keydown = keyMap.keydown,
    keyup = keyMap.keyup;
  //keyup[ROT.VK_RETURN] = win;
  //keyup[ROT.VK_ESCAPE] = lose;
  keydown[ROT.VK_LEFT] = gameCommands.GoLeft;
  keydown[ROT.VK_RIGHT] = gameCommands.GoRight;
  keydown[ROT.VK_UP] = gameCommands.GoUp;
  keydown[ROT.VK_DOWN] = gameCommands.GoDown;
  keydown[ROT.VK_NUMPAD4] = gameCommands.GoLeft;
  keydown[ROT.VK_NUMPAD7] = gameCommands.GoUpLeft;
  keydown[ROT.VK_NUMPAD8] = gameCommands.GoUp;
  keydown[ROT.VK_NUMPAD9] = gameCommands.GoUpRight;
  keydown[ROT.VK_NUMPAD6] = gameCommands.GoRight;
  keydown[ROT.VK_NUMPAD3] = gameCommands.GoDownRight;
  keydown[ROT.VK_NUMPAD2] = gameCommands.GoDown;
  keydown[ROT.VK_NUMPAD1] = gameCommands.GoDownLeft;
  keydown[ROT.VK_NUMPAD5] = gameCommands.WaitInPlace;
  //keydown[ROT.VK_S] = gameCommands.SaveGame;
  //keydown[ROT.VK_F1] = toggleRenderMode.bind(this);
  //keydown[ROT.VK_COMMA] = handlePickupCommand.bind(this);
  //keydown[ROT.VK_I] = showInventoryCommand.bind(this);
  //keydown[ROT.VK_Z] = handleSpellCastCommand.bind(this);

  return keyMap;

}
