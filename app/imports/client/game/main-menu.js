import display from './display';
import inGameScreen from './in-game-screen';
import GameGenerator from 'shattered-game/GameGenerator';

function render() {
  display.drawText(5, 2, 'Welcome to the Shattered Realms');
  setTimeout(()=> {
    const gameGenerator = new GameGenerator();
    inGameScreen.load(gameGenerator.generate());
    console.log('game generated');
  }, 1000);
}
const mainMenu = {render: render};

export default mainMenu;
