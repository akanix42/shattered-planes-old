import screen from './game.html';
import display from '/client/game/display';

screen.viewmodel({
  onRendered(){
    this.container.append(display.getContainer());
  }
});