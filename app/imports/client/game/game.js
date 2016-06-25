import screen from './game.html';
import display from '/imports/client/game/display';
import fonts from '/client/fonts';
import mainMenu from './screens/mainMenuScreen';
import screenStack from './screens/screenStack';
import styles from './game.scss';

export { default as gameScreen } from './game.html';

screen.helpers({
  styles
});

screen.viewmodel({
  async onRendered(){
    await fonts;
    //setTimeout(()=>{
    // this.container.append(display.getContainer());
    screenStack.container = this.container;
    mainMenu.show();
    //}, 250)
  }
});
