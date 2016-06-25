import { createDisplay} from '../display';
import gameInput from '../game-input';
import global from 'shattered-game/global';
import gameCommands from '../game-commands';
import ROT from 'rot-js';
import Screen from './Screen';
import inventoryScreen from './inventoryScreen';

class InGameScreen extends Screen {
  game = null;
  _keyMap = getKeyMap.call(this);
  _display = createDisplay();

  load(game) {
    this.game = game;
    global.screen = this;
    game.start();

    postal.subscribe({
      channel: 'ui',
      topic: 'vision.update',
      callback: (event)=> {
        this.renderTile(event.data.tile);
      }
    });
    postal.subscribe({
      channel: 'ui',
      topic: 'vision.reset',
      callback: (event)=> {
        this.renderFov(event.data.fov);
      }
    });
  }

  render(gameState=this.gameState) {
    this._display.clear();
    // this._display.drawText(5, 2, 'PLAY BALL');
    this.gameState = gameState;
  }

  renderFov(fov) {
    fov.forEach(this.renderTile);
  }

  renderTile(tile) {
    this._display.draw(tile.point.x, tile.point.y, '.', 'white', 'black');
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
  keydown[ROT.VK_I] = showInventoryCommand.bind(this);
  //keydown[ROT.VK_Z] = handleSpellCastCommand.bind(this);

  return keyMap;

}

function showInventoryCommand() {
  inventoryScreen.show();
}
