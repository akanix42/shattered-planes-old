'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';
import ActorComponent from './ActorComponent';
import { postal } from '/global';

@serializable('TimekeeperActorComponent')
class TimekeeperActorComponent extends ActorComponent {
  _turnNumber = 0;
  _turnSpeed = 1000;

  constructor(game, timeout = 5) {
    super(game);
    this._timeout = timeout;
  }

  act() {
    return new Promise((resolve)=> {
      this._turnNumber++;
      postal.publish({
        channel: 'ui',
        topic: 'turn.update',
        data: {
          turn: this._turnNumber
        }
      });
      if (this._timeout > 0)
        setTimeout(() => resolve(this._turnSpeed), this._timeout);
      else
        resolve(this._turnSpeed);
    });
  }
}
TimekeeperActorComponent._name = 'timekeeperActor';

export default TimekeeperActorComponent;
