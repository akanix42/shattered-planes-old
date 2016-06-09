import screen from './game.html';
import display from '/imports/client/game/display';
import fonts from '/client/fonts';
import mainMenu from './main-menu';

export { default as gameScreen } from './game.html';

screen.viewmodel({
  async onRendered(){
    await fonts.areLoaded;
    //setTimeout(()=>{
    this.container.append(display.getContainer());
    mainMenu.render();
    //}, 250)
  }
});
