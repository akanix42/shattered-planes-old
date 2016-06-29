import screen from './game.html';
import display from '/imports/client/game/display';
import fonts from '/client/fonts';
import mainMenu from './screens/mainMenuScreen';
import screenStack from './screens/screenStack';
import styles from './game.scss';
import {postal} from 'shattered-game/global';

export { default as gameScreen } from './game.html';

screen.helpers({
  styles
});

screen.viewmodel({
  turn: 0,
  async onRendered(){
    await fonts;
    //setTimeout(()=>{
    screenStack.container = this.container;
    mainMenu.show();
    //}, 250)
    postal.subscribe({
      channel: 'ui',
      topic: 'turn.update',
      callback: (data)=> {
        this.turn(data.turn);
      }
    });
  }
});
