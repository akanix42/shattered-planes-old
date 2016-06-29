'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import global from '/global';
import ROT from 'rot-js';
import events from '/events';

@serializable('TimekeeperActorComponent')
class TimekeeperActorComponent extends Component {
  turnNumber = 0;

  constructor(game, timeout = 5) {
    super(game);
    this._timeout = timeout;
    global.game.engine.add(this);
  }

  act() {
    return new Promise((resolve)=> {
      console.log(`turn ${this.turnNumber++}`);
      resolve(1000);
    });
  }
}
TimekeeperActorComponent._name = 'timekeeperActor';

export default TimekeeperActorComponent;
