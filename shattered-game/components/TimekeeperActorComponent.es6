'use strict';
import {serializable} from 'jsonc';
import ROT from 'rot-js';
import events from '/events';
import ActorComponent from './ActorComponent';

@serializable('TimekeeperActorComponent')
  turnNumber = 0;
class TimekeeperActorComponent extends ActorComponent {

  constructor(game, timeout = 5) {
    super(game);
    this._timeout = timeout;
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
