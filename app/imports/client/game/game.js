import screen from './game.html';
import display from '/imports/client/game/display';
import fonts from '/client/fonts';
import mainMenu from './screens/mainMenuScreen';
import screenStack from './screens/screenStack';
import styles from './game.scss';
import { postal } from 'shattered-game/global';

export { default as gameScreen } from './game.html';

screen.helpers({
  styles
});

let avgTps = 0;
let lastTurnAt = null;
screen.viewmodel({
  turn: 0,
  turnsPerSecond: 0,
  width: 10,
  height: 10,
  numberOfCreatures: 0,
  async onRendered(){
    await fonts;
    //setTimeout(()=>{
    screenStack.bindInputEvents();
    screenStack.container = this.container;
    mainMenu.show();
    //}, 250)
    postal.subscribe({
      channel: 'ui',
      topic: 'turn.update',
      callback: (data)=> {
        const turnAt = performance.now();
        if (data.turn === 1)
          lastTurnAt = null;
        this.turn(data.turn);
        if (lastTurnAt !== null) {
          const diff = turnAt - lastTurnAt;
          const tps = 1000 / diff;
          avgTps += (tps - avgTps) / (data.turn - 1);
          this.turnsPerSecond(avgTps.toFixed(2));
        }
        lastTurnAt = turnAt;
      }
    });
  },
  autorun: [
    function () {
      this.numberOfCreatures(this.width() * this.height() / 2);
    },
    function () {
      mainMenu.options = { numberOfCreatures: parseInt(this.numberOfCreatures()), width: parseInt(this.width()), height: parseInt(this.height()) };
    }
  ]
});
