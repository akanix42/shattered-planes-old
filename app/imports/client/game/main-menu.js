import display from './display';
import inGameScreen from './in-game-screen';

function render() {
  display.drawText(5, 2, 'Welcome to the Shattered Realms')
}
const mainMenu = { render: render };

export default mainMenu;
