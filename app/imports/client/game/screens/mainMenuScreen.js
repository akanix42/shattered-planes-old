import { createDisplay} from '../display';
import inGameScreen from './inGameScreen';
import GameGenerator from 'shattered-game/GameGenerator';
import Screen from './Screen';
import Entity from 'shattered-lib/Entity';
import EntityGenerator from 'shattered-game/EntityGenerator';
import components from 'shattered-game/components/index';
import events from 'shattered-game/events';

class MainMenuScreen extends Screen {
  _display = createDisplay();
  render() {
    this._display.drawText(5, 2, 'Welcome to the Shattered Realms');
    this._display.drawText(5, 6, 'Press [Enter]┐ to start!');

    setTimeout(()=> {
      const gameGenerator = new GameGenerator();
      const game = gameGenerator.generate({numberOfLevels: 1});
      inGameScreen.load(game);

      const entityGenerator = new EntityGenerator();
      const player = entityGenerator.generate('player');

      player.attributes.add('moveSpeed', 1);

      player.emit({name: events.onPosition, destination: game.levels[1].getTileAt({x: 0, y: 0})});

      inGameScreen.show();
      game.start();

    }, 1000);
  }
}

export default new MainMenuScreen();
