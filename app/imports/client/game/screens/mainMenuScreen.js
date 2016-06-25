import { createDisplay} from '../display';
import inGameScreen from './inGameScreen';
import GameGenerator from 'shattered-game/GameGenerator';
import Screen from './Screen';
import Entity from 'shattered-lib/Entity';
import components from 'shattered-game/components/index';

class MainMenuScreen extends Screen {
  _display = createDisplay();
  render() {
    this._display.drawText(5, 2, 'Welcome to the Shattered Realms');
    this._display.drawText(5, 6, 'Press [Enter]┐ to start!');

    setTimeout(()=> {
      const gameGenerator = new GameGenerator();
      const game = gameGenerator.generate({numberOfLevels: 1});
      const player = new Entity();

      player.attributes.add('moveSpeed', 1);
      player
        .addComponent(new components.normalMovement())
        .addComponent(new components.occupant())
        .addComponent(new components.vision())
        .addComponent(new components.testAutomatedActor())

      game.levels[1].getTileAt({x: 0, y: 0}).addOccupant(player);
      inGameScreen.load(game);
      inGameScreen.show();
    }, 1000);
  }
}

export default new MainMenuScreen();
